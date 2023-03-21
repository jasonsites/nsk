/**
 * @file http/middleware/response-time.ts
 * @overview http response time tracker
 */

export default function middleware() {
  return async function responseTime(ctx, next) {
    const start = Date.now()
    await next()
    const ellapsed = `${Date.now() - start}ms`
    ctx.response.set('X-Response-Time', ellapsed)
  }
}

export const inject = {}
