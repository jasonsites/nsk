/**
 * @file http/app.ts
 * @overview http server
 */

import config from 'config'
import Koa from 'koa'

export default function application({ logger, router }) {
  const app: any = new Koa()

  app.initialize = async function start() {
    try {
      router.configureMiddleware(app)
      router.registerRoutes(app)
      const { port } = config.get('api')
      app.server = app.listen(port)
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
