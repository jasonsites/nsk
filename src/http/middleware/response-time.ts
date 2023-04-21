/**
 * @file http/middleware/response-time.ts
 * @overview http response time tracker
 */

import type { Context, Next } from 'koa'

export default function middleware() {
  return async function responseTime(ctx: Context, next: Next) {
    const start = Date.now()
    await next()
    const ellapsed = `${Date.now() - start}ms`
    ctx.response.set('X-Response-Time', ellapsed)
  }
}

export const inject = {}
