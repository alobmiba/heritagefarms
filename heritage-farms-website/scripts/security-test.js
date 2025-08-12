#!/usr/bin/env node

/**
 * Security Testing Script for Heritage Farms Website
 * 
 * This script performs various security tests to validate the implemented
 * security measures and identify potential vulnerabilities.
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

class SecurityTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  async test(testName, testFunction) {
    try {
      console.log(`\n🔍 Testing: ${testName}`);
      await testFunction();
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'PASSED' });
      console.log(`✅ ${testName} - PASSED`);
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name: testName, status: 'FAILED', error: error.message });
      console.log(`❌ ${testName} - FAILED: ${error.message}`);
    }
  }

  async testWarning(testName, testFunction) {
    try {
      console.log(`\n⚠️  Testing: ${testName}`);
      await testFunction();
      this.results.warnings++;
      this.results.tests.push({ name: testName, status: 'WARNING' });
      console.log(`⚠️  ${testName} - WARNING`);
    } catch (error) {
      this.results.tests.push({ name: testName, status: 'WARNING', error: error.message });
      console.log(`⚠️  ${testName} - WARNING: ${error.message}`);
    }
  }

  async makeRequest(path, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, this.baseUrl);
      const client = url.protocol === 'https:' ? https : http;
      
      const requestOptions = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 3000),
        path: url.pathname + url.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'Security-Test-Script/1.0',
          ...options.headers
        }
      };

      const req = client.request(requestOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      });

      req.on('error', reject);
      
      if (options.body) {
        req.write(options.body);
      }
      
      req.end();
    });
  }

  async runAllTests() {
    console.log('🔒 Starting Security Tests for Heritage Farms Website\n');
    console.log(`Base URL: ${this.baseUrl}`);

    // HTTP Security Headers Tests
    await this.test('X-Frame-Options Header', async () => {
      const response = await this.makeRequest('/');
      if (!response.headers['x-frame-options']) {
        throw new Error('X-Frame-Options header missing');
      }
      if (response.headers['x-frame-options'] !== 'DENY') {
        throw new Error(`X-Frame-Options should be DENY, got: ${response.headers['x-frame-options']}`);
      }
    });

    await this.test('X-Content-Type-Options Header', async () => {
      const response = await this.makeRequest('/');
      if (!response.headers['x-content-type-options']) {
        throw new Error('X-Content-Type-Options header missing');
      }
      if (response.headers['x-content-type-options'] !== 'nosniff') {
        throw new Error(`X-Content-Type-Options should be nosniff, got: ${response.headers['x-content-type-options']}`);
      }
    });

    await this.test('X-XSS-Protection Header', async () => {
      const response = await this.makeRequest('/');
      if (!response.headers['x-xss-protection']) {
        throw new Error('X-XSS-Protection header missing');
      }
    });

    await this.test('Strict-Transport-Security Header', async () => {
      const response = await this.makeRequest('/');
      if (!response.headers['strict-transport-security']) {
        throw new Error('Strict-Transport-Security header missing');
      }
    });

    await this.test('Content-Security-Policy Header', async () => {
      const response = await this.makeRequest('/');
      if (!response.headers['content-security-policy']) {
        throw new Error('Content-Security-Policy header missing');
      }
    });

    // API Security Tests
    await this.test('Contact Form Rate Limiting', async () => {
      // Send multiple requests quickly
      const promises = Array(15).fill().map(() => 
        this.makeRequest('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'name=Test&email=test@example.com&message=Test message'
        })
      );

      const responses = await Promise.all(promises);
      const rateLimited = responses.some(r => r.statusCode === 429);
      
      if (!rateLimited) {
        throw new Error('Rate limiting not working - should have received 429 status');
      }
    });

    await this.test('Contact Form Input Validation', async () => {
      const response = await this.makeRequest('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'name=<script>alert("xss")</script>&email=invalid-email&message='
      });

      if (response.statusCode !== 400) {
        throw new Error('Input validation not working - should have received 400 status for invalid input');
      }
    });

    await this.test('Contact Form XSS Protection', async () => {
      const response = await this.makeRequest('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'name=Test&email=test@example.com&message=<script>alert("xss")</script>'
      });

      if (response.statusCode === 200) {
        // Check if the response contains the script tag
        if (response.body.includes('<script>')) {
          throw new Error('XSS protection not working - script tags found in response');
        }
      }
    });

    // Authentication Tests
    await this.test('Admin Route Protection', async () => {
      const response = await this.makeRequest('/admin');
      if (response.statusCode !== 403 && response.statusCode !== 302) {
        throw new Error(`Admin route not properly protected - got status ${response.statusCode}`);
      }
    });

    // Error Handling Tests
    await this.test('Error Information Disclosure', async () => {
      const response = await this.makeRequest('/api/nonexistent');
      if (response.body.includes('stack trace') || response.body.includes('Error:')) {
        throw new Error('Error information disclosure - stack traces or error details exposed');
      }
    });

    // Content Security Tests
    await this.test('CSP Script Source Restriction', async () => {
      const response = await this.makeRequest('/');
      const csp = response.headers['content-security-policy'];
      if (csp && !csp.includes("script-src 'self'")) {
        throw new Error('CSP script-src not properly configured');
      }
    });

    // Warnings (non-critical issues)
    await this.testWarning('HTTPS Enforcement', async () => {
      if (this.baseUrl.startsWith('http:')) {
        throw new Error('Site should use HTTPS in production');
      }
    });

    await this.testWarning('Powered-By Header Removal', async () => {
      const response = await this.makeRequest('/');
      if (response.headers['x-powered-by']) {
        throw new Error('X-Powered-By header should be removed');
      }
    });

    // Print results
    this.printResults();
  }

  printResults() {
    console.log('\n' + '='.repeat(60));
    console.log('🔒 SECURITY TEST RESULTS');
    console.log('='.repeat(60));
    
    console.log(`\n✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    
    console.log('\n📋 Detailed Results:');
    this.results.tests.forEach(test => {
      const status = test.status === 'PASSED' ? '✅' : 
                    test.status === 'FAILED' ? '❌' : '⚠️';
      console.log(`${status} ${test.name}`);
      if (test.error) {
        console.log(`   Error: ${test.error}`);
      }
    });

    console.log('\n🎯 Recommendations:');
    if (this.results.failed > 0) {
      console.log('❌ Critical security issues found. Fix these immediately.');
    } else if (this.results.warnings > 0) {
      console.log('⚠️  Security warnings found. Consider addressing these.');
    } else {
      console.log('✅ All security tests passed!');
    }

    console.log('\n📚 Next Steps:');
    console.log('1. Run automated security scanners (OWASP ZAP, Snyk)');
    console.log('2. Perform manual penetration testing');
    console.log('3. Set up continuous security monitoring');
    console.log('4. Regular security audits and updates');
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const tester = new SecurityTester(baseUrl);
  
  tester.runAllTests().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = SecurityTester;
