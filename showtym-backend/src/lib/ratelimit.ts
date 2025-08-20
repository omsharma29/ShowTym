import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis.js';

const limiter  = new Ratelimit({
    redis, 
    limiter : Ratelimit.slidingWindow(10, "1m")
})

export const rateLimiter = async(c:any, next: any)=>{
  const headers = c.req.headers || {};
  const ip =
    (typeof headers.get === "function" ? headers.get("x-forwarded-for") : headers["x-forwarded-for"]) ||
    (c.req.conn?.remoteAddr as string) ||
    "global";

    const {success, remaining,reset} = await limiter.limit(ip)

      if (!success) {
    return c.json(
      { error: 'Rate limit exceeded',  message: "Try again after 1 minute" },
      429
    );
  }
    return next();
}