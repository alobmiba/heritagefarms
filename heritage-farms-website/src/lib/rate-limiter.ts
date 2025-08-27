import { RateLimiterRedis } from 'rate-limiter-flexible';
import { kv } from '@vercel/kv';

const rateLimiter = new RateLimiterRedis({
  storeClient: kv,
  keyPrefix: 'ratelimit',
  points: 10, // 10 requests
  duration: 60, // per 60 seconds by IP
});

export default rateLimiter;
