/**
 * @file healthcheck router
 */

import config from 'config'
import Router from 'koa-router'

import type { Context } from 'koa'
import type { ApiConfiguration } from '../types'

export default function route(): Router {
  const { namespace }: ApiConfiguration = config.get('api')
  const router = new Router({ prefix: `/${namespace}/health` })

  async function status(ctx: Context) {
    ctx.body = { meta: { status: 'healthy' } }
    ctx.status = 200
  }

  router.get('/', status)

  return router
}

export const inject = {}
