/**
 * @file http/middleware/request-logger.ts
 * @overview http request logger
 */

import config from 'config'

import type Logger from 'bunyan'
import type { Context, Next } from 'koa'
import { LoggerConfiguration } from '../../types/globals'

type Dependencies = {
  logger: Logger,
}

export default function middleware({ logger }: Dependencies) {
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
