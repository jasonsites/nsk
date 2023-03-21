/**
 * @file http/middleware/local-type.ts
 * @overview sets local resource type
 */

export default function middleware({ type }) {
  return function setType(ctx, next) {
    ctx.state.type = type
    return next()
  }
}

export const inject = { type: 'object' }
