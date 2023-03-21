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

      async function create({ data, permissions, type }) {
        const model = models.getModel({ log, type })
        return model.create({ data, permissions })
      }

      async function destroy({ id, permissions, type }) {
        const model = models.getModel({ log, type })
        return model.destroy({ id, permissions })
      }

      async function detail({ id, permissions, type }) {
        const model = models.getModel({ log, type })
        return model.detail({ id, permissions })
      }

      async function list(params) {
        const { filters, id, page, permissions, sort, type } = params

        const model = models.getModel({ log, type })
        return model.list({ filters, id, page, permissions, sort })
      }

      async function update({ data, permissions, type }) {
        const model = models.getModel({ log, type })
        return model.update({ data, permissions })
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
