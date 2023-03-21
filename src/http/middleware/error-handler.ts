/**
 * @file http/middleware/error-handler.ts
 * @overview http error handler
 */

import { badRequest, boomify, forbidden, notFound, unauthorized } from '@hapi/boom'

export default function middleware({ core }) {
  const { ErrorType } = core

  return async function errorHandler(ctx, next) {
    try {
      await next()
    } catch (err) {
      const { log } = ctx
      if (log) log.error(err)
      else console.error(err) // eslint-disable-line

      const boomError: any = boomifyError(err)
      const { details, output, type } = boomError
      const { message, statusCode } = output.payload

      ctx.body = type === ErrorType.Validation && Array.isArray(details)
        ? { errors: details }
        : { errors: [{ status: statusCode, title: type, detail: message }] }
      ctx.status = statusCode
      ctx.state.error = boomError
    }
  }

  function boomifyError(error) {
    switch (error.type) {
      case ErrorType.Forbidden: return forbidden(error)
      case ErrorType.NotFound: return notFound(error)
      case ErrorType.Unauthorized: return unauthorized(error)
      case ErrorType.Validation: return badRequest(error)
      default: {
        const err: any = boomify(error, { statusCode: 500 })
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
