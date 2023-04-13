/**
 * @file repo/index.ts
 * @overview repository
 */

import config from 'config'

export default function repository({ logger, models }) {
  const { enabled, label, level } = config.get('logger.repo')

  return {
    context: (correlation) => {
      const { req_id } = correlation
      const log = logger.child({ module: label, req_id, level })
      log.enabled = enabled

      async function create(params) {
        const { data, type } = params
        const model = models.getModel({ log, type })
        return model.create({ data })
      }

      async function destroy(params) {
        const { id, type } = params
        const model = models.getModel({ log, type })
        return model.destroy({ id })
      }

      async function detail(params) {
        const { id, type } = params
        const model = models.getModel({ log, type })
        return model.detail({ id })
      }

      async function list(params) {
        const { filters, id, page, sort, type } = params
        const model = models.getModel({ log, type })
        return model.list({ filters, id, page, sort })
      }

      async function update(params) {
        const { data, id, type } = params
        const model = models.getModel({ log, type })
        return model.update({ data, id })
      }

      return { create, destroy, detail, list, update }
    },
  }
}

export const inject = {
  name: 'repo',
  require: {
    logger: 'logger',
    models: 'repo/models/index',
  },
}
