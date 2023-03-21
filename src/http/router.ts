/**
 * @file http/router.ts
 * @overview http middleware and router configuration
 */

import { notImplemented, methodNotAllowed } from '@hapi/boom'
import koaBody from 'koa-body'
import compress from 'koa-compress'
import helmet from 'koa-helmet'

export default function router({ middleware, routes }) {
  function configureMiddleware(app) {
    app.use(compress())
    app.use(middleware.responseLogger)
    app.use(middleware.responseTime)
    app.use(helmet())
    app.use(middleware.errorHandler)
    app.use(koaBody({ includeUnparsed: true }))
    app.use(middleware.correlation)
    app.use(middleware.requestLogger)
  }

  function registerRoutes(app) {
    routes.forEach((r) => {
      app.use(r.routes())
      app.use(r.allowedMethods({
        notImplemented: () => notImplemented(),
        methodNotAllowed: () => methodNotAllowed(),
      }))
    })
  }

  return { configureMiddleware, registerRoutes }
}

export const inject = {
  require: {
    middleware: {
      correlation: 'http/middleware/correlation',
      errorHandler: 'http/middleware/error-handler',
      requestLogger: 'http/middleware/request-logger',
      responseLogger: 'http/middleware/response-logger',
      responseTime: 'http/middleware/response-time',
    },
    routes: 'any!^http/routes/.+',
  },
}
