/**
 * @file http request logger
 */

import config from 'config'

import type Logger from 'bunyan'
import type { Context, Middleware, Next } from 'koa'
import type { LoggerConfiguration } from '../../types/logger'

interface Dependencies {
  logger: Logger
}

export default function middleware(deps: Dependencies): Middleware {
  const { logger } = deps
  const { enabled, label, level }: LoggerConfiguration = config.get('logger.http.request')

  return async function requestLogger(ctx: Context, next: Next) {
    const { ip, request, state } = ctx
    const { correlation: { req_id } } = state
    ctx.log = logger.child({ module: label, req_id, ip, level })
    if (enabled) {
      const { body, headers, method, url } = request
      const base = { headers, method, url }
      if (level === 'debug') ctx.log.debug({ body, ...base })
      else ctx.log.info(base)
    }
    return next()
  }
}

export const inject = {
  require: {
    logger: 'logger',
  },
}
