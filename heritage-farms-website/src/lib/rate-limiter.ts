import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';

// Check if we're in build time or missing KV credentials
const isBuildTime = () => {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
};

const hasKVCredentials = () => {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
};

// Create rate limiter based on environment
let rateLimiter: RateLimiterMemory | RateLimiterRedis;

if (isBuildTime() || !hasKVCredentials()) {
  // Use memory rate limiter during build or when KV is not available
  rateLimiter = new RateLimiterMemory({
    keyPrefix: 'ratelimit',
    points: 10, // 10 requests
    duration: 60, // per 60 seconds by IP
  });
} else {
  // Use Redis rate limiter with Vercel KV in production
  const { kv } = require('@vercel/kv');
  rateLimiter = new RateLimiterRedis({
    storeClient: kv,
    keyPrefix: 'ratelimit',
    points: 10, // 10 requests
    duration: 60, // per 60 seconds by IP
  });
}

export default rateLimiter;
