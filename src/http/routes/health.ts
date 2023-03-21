/**
 * @file http/routes/health.ts
 * @overview healthcheck router
 */

import config from 'config'
import Router from '@koa/router'

export default function route() {
  const { namespace } = config.get('api')
  const router = new Router({ prefix: `/${namespace}/health` })

  async function status(ctx) {
    ctx.body = { meta: { status: 'healthy' } }
    ctx.status = 200
  }

  router.get('/', status)

  return router
}

export const inject = {}
