/**
 * @file sets local resource type
 */

import type { Context, Next } from 'koa'

interface Dependencies {
  type: string,
}

export default function middleware(deps: Dependencies) {
  const { type } = deps

  return function setType(ctx: Context, next: Next) {
    ctx.state.type = type
    return next()
  }
}

export const inject = { type: 'object' }
