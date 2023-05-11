/**
 * @file http error handler
 */

import { badRequest, boomify, conflict, forbidden, notFound, unauthorized } from '@hapi/boom'

import type Boom from 'boom'
import type { Context, Middleware, Next } from 'koa'
import type { CoreTypes, CustomError } from '../../types/core'

type AugmentedBoom = Boom<unknown> & { details?: object[], type: string }

interface Dependencies {
  core: CoreTypes,
}

export default function middleware(deps: Dependencies): Middleware {
  const { core: { ErrorType } } = deps

  return async function errorHandler(ctx: Context, next: Next) {
    try {
      await next()
    } catch (err: any) {
      const { log } = ctx
      if (log) log.error(err)
      else console.error(err) // eslint-disable-line

      const boomError: AugmentedBoom = boomifyError(err)
      const { details, output, type } = boomError
      const { message, statusCode } = output.payload

      ctx.body = type === ErrorType.Validation && Array.isArray(details)
        ? { errors: details }
        : { errors: [{ status: statusCode, title: type, detail: message }] }
      ctx.status = statusCode
      ctx.state.error = boomError
    }
  }

  function boomifyError(error: CustomError): AugmentedBoom {
    switch (error.type) {
      case ErrorType.Conflict: return conflict(error) as unknown as AugmentedBoom
      case ErrorType.Forbidden: return forbidden(error) as unknown as AugmentedBoom
      case ErrorType.NotFound: return notFound(error) as unknown as AugmentedBoom
      case ErrorType.Unauthorized: return unauthorized(error) as unknown as AugmentedBoom
      case ErrorType.Validation: return badRequest(error) as unknown as AugmentedBoom
      default: {
        const err: AugmentedBoom = boomify(error, { statusCode: 500 })
        err.type = ErrorType.InternalServer
        return err
      }
    }
  }
}

export const inject = {
  require: {
    core: 'core',
  },
}
