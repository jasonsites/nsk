/**
 * @file sets local resource type
 * NOTE: this middleware is uniquely accessed per route
 */

import type { Context, Middleware, Next } from 'koa'

interface Dependencies {
  type: string,
}

export default function middleware(deps: Dependencies): Middleware {
  const { type } = deps

  return function setType(ctx: Context, next: Next) {
    ctx.state.type = type
    return next()
  }
}

export const inject = { type: 'object' }
