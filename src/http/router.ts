/**
 * @file http/router.ts
 * @overview http middleware and router configuration
 */

import { notImplemented, methodNotAllowed } from '@hapi/boom'
import koaBody from 'koa-body'
import compress from 'koa-compress'
import helmet from 'koa-helmet'

import type { Middleware } from 'koa'
import type Router from 'koa-router'
import type { HttpServer } from '../types/globals'

type Dependencies = {
  middleware: {
    correlation: Middleware,
    errorHandler: Middleware,
    requestLogger: Middleware,
    responseLogger: Middleware,
    responseTime: Middleware,
  },
  routes: Router[],
}

export default function router(deps: Dependencies) {
  const { middleware, routes } = deps

  function configureMiddleware(app: HttpServer) {
    app.use(compress())
    app.use(middleware.responseLogger)
    app.use(middleware.responseTime)
    app.use(helmet())
    app.use(middleware.errorHandler)
    app.use(koaBody({ includeUnparsed: true }))
    app.use(middleware.correlation)
    app.use(middleware.requestLogger)
  }

  function registerRoutes(app: HttpServer) {
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
