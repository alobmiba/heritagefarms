'use client';

import React, { useEffect, useState } from 'react';
// Performance monitoring utilities are used internally

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  fcp: number | null;
  loadTime: number | null;
}

interface PerformanceMonitorProps {
  showMetrics?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  className?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  showMetrics = false,
  onMetricsUpdate,
  className = '',
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null,
    loadTime: null,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsMonitoring(true);

    // Measure page load time
    const measureLoadTime = () => {
      const loadTime = performance.now();
      setMetrics(prev => ({ ...prev, loadTime }));
    };

    // Measure TTFB (Time to First Byte)
    const measureTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        setMetrics(prev => ({ ...prev, ttfb }));
      }
    };

    // Measure FCP (First Contentful Paint)
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    };

    // Measure LCP (Largest Contentful Paint)
    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    };

    // Measure FID (First Input Delay)
    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fid = (entry as PerformanceEntry & { processingStart: number }).processingStart - entry.startTime;
          setMetrics(prev => ({ ...prev, fid }));
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    };

    // Measure CLS (Cumulative Layout Shift)
    const measureCLS = () => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!(entry as PerformanceEntry & { hadRecentInput: boolean }).hadRecentInput) {
            cls += (entry as PerformanceEntry & { value: number }).value;
            setMetrics(prev => ({ ...prev, cls }));
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    };

    // Start measurements
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        measureLoadTime();
        measureTTFB();
        measureFCP();
        measureLCP();
        measureFID();
        measureCLS();
      });
    } else {
      measureLoadTime();
      measureTTFB();
      measureFCP();
      measureLCP();
      measureFID();
      measureCLS();
    }

    // Cleanup
    return () => {
      setIsMonitoring(false);
    };
  }, []);

  // Update parent component when metrics change
  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
  }, [metrics, onMetricsUpdate]);

  // Get performance grade
  const getPerformanceGrade = (metric: keyof PerformanceMetrics): string => {
    const value = metrics[metric];
    if (value === null) return 'N/A';

    const thresholds = {
      lcp: { good: 2500, needsImprovement: 4000 },
      fid: { good: 100, needsImprovement: 300 },
      cls: { good: 0.1, needsImprovement: 0.25 },
      ttfb: { good: 800, needsImprovement: 1800 },
      fcp: { good: 1800, needsImprovement: 3000 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'N/A';

    if (value <= threshold.good) return 'Good';
    if (value <= threshold.needsImprovement) return 'Needs Improvement';
    return 'Poor';
  };

  // Get grade color
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'Good': return 'text-green-600';
      case 'Needs Improvement': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Format metric value
  const formatMetric = (metric: keyof PerformanceMetrics): string => {
    const value = metrics[metric];
    if (value === null) return 'N/A';

    switch (metric) {
      case 'lcp':
      case 'fid':
      case 'ttfb':
      case 'fcp':
        return `${Math.round(value)}ms`;
      case 'cls':
        return value.toFixed(3);
      case 'loadTime':
        return `${Math.round(value)}ms`;
      default:
        return value.toString();
    }
  };

  if (!showMetrics) {
    return null;
  }

  return (
    <div className={`performance-monitor ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Performance Metrics
          {isMonitoring && (
            <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Core Web Vitals */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Core Web Vitals</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">LCP</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{formatMetric('lcp')}</span>
                  <span className={`ml-2 text-xs ${getGradeColor(getPerformanceGrade('lcp'))}`}>
                    {getPerformanceGrade('lcp')}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">FID</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{formatMetric('fid')}</span>
                  <span className={`ml-2 text-xs ${getGradeColor(getPerformanceGrade('fid'))}`}>
                    {getPerformanceGrade('fid')}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">CLS</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{formatMetric('cls')}</span>
                  <span className={`ml-2 text-xs ${getGradeColor(getPerformanceGrade('cls'))}`}>
                    {getPerformanceGrade('cls')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Additional Metrics</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">TTFB</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{formatMetric('ttfb')}</span>
                  <span className={`ml-2 text-xs ${getGradeColor(getPerformanceGrade('ttfb'))}`}>
                    {getPerformanceGrade('ttfb')}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">FCP</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{formatMetric('fcp')}</span>
                  <span className={`ml-2 text-xs ${getGradeColor(getPerformanceGrade('fcp'))}`}>
                    {getPerformanceGrade('fcp')}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Load Time</span>
                <div className="text-right">
                  <span className="text-sm font-medium">{formatMetric('loadTime')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Tips</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Optimize images and use WebP format</li>
            <li>• Minimize JavaScript bundle size</li>
            <li>• Use lazy loading for non-critical resources</li>
            <li>• Enable compression and caching</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
