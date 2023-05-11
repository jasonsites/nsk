/**
 * @file http server application
 */

import config from 'config'
import Koa from 'koa'

import type Logger from 'bunyan'
import type { ApiConfiguration, HttpRouter, HttpServer } from './types'

interface Dependencies {
  logger: Logger
  router: HttpRouter
}

export default function application(deps: Dependencies): HttpServer {
  const { logger, router } = deps
  const app: HttpServer = new Koa() as HttpServer

  app.initialize = async function start() {
    try {
      router.configureMiddleware(app)
      router.registerRoutes(app)
      const { port }: ApiConfiguration = config.get('api')
      app.listen(port)
      logger.info(`application listening on port: ${port}`)
    } catch (error) {
      console.error('error starting application', error) // eslint-disable-line
      throw error
    }
  }

  return app
}

export const inject = {
  init: 'initialize',
  require: {
    logger: 'logger',
    router: 'http/router',
  },
}
