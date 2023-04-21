/**
 * @file http/middleware/local-type.ts
 * @overview sets local resource type
 */

import type { Context, Next } from 'koa'

type Dependencies = {
  type: string,
}

export default function middleware({ type }: Dependencies) {
  return function setType(ctx: Context, next: Next) {
    ctx.state.type = type
    return next()
  }
}

export const inject = { type: 'object' }
