/**
 * @file example resource router
 */

import config from 'config'
import Router from 'koa-router'

import type { CoreTypes } from '../../types/core'
import type { ApiConfiguration, Controller, MiddlewareLocalType } from '../types'

interface Dependencies {
  controller: Controller
  core: CoreTypes
  middleware: MiddlewareLocalType
}

export default function route(deps: Dependencies): Router {
  const { controller, core, middleware } = deps
  const { create, destroy, detail, list, update } = controller

  const { namespace }: ApiConfiguration = config.get('api')
  const router = new Router({ prefix: `/${namespace}/example-resources` })
  router.use(middleware.localType({ type: core.model.example }))

  router.get('/', list)
  router.get('/:id', detail)
  router.post('/', create)
  router.put('/:id', update)
  router.delete('/:id', destroy)

  return router
}

export const inject = {
  require: {
    controller: 'http/controllers/domain',
    core: 'core',
    middleware: {
      localType: 'http/middleware/local-type',
    },
  },
}
