/**
 * @file http/routes/resource.ts
 * @overview example resource router
 */

import config from 'config'
import Router from '@koa/router'

export default function route({ controller, core, middleware }) {
  const { create, destroy, detail, list, update } = controller

  const { namespace } = config.get('api')
  const router = new Router({ prefix: `/${namespace}/resources` })
  router.use(middleware.localType({ type: core.Resource.DomainResource }))

  router.get('/', list)
  router.get('/:id', detail)
  router.post('/', create)
  router.patch('/:id', update)
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
