/**
 * @file http/routes/base.ts
 * @overview root (`/`) router
 * NOTE: the base route only exists to easily verify a working app and should normally be removed
 */

import config from 'config'
import Router from '@koa/router'

export default function route() {
  async function get(ctx) {
    ctx.body = { data: 'base router is working....' }
    ctx.status = 200
  }

  const { namespace } = config.get('api')
  const router = new Router({ prefix: `/${namespace}` })

  router.get('/', get)

  return router
}

export const inject = {}
