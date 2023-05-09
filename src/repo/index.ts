/**
 * @file repository interface
 */

import Logger from 'bunyan'
import config from 'config'

import type { Correlation } from '../types/core'
import type { ScopedLogger, LoggerConfiguration } from '../types/logger'
import type { Repository } from '../types/repository'
import type { Model, RepoResult } from './models/types'

interface Dependencies {
  logger: Logger
  models: { getModel: (params: { log: ScopedLogger, type: string }) => Model }
}

export default function repository(deps: Dependencies): {
  context: (correlation: Correlation) => Repository,
} {
  const { logger, models } = deps
  const { enabled, label, level }: LoggerConfiguration = config.get('logger.repo')

  return {
    context: (correlation: Correlation) => {
      const { req_id } = correlation
      const log: ScopedLogger = logger.child({ module: label, req_id, level })
      log.enabled = enabled

      async function create(params: { data: unknown, type: string }): Promise<RepoResult> {
        const { data, type } = params
        const model: Model = models.getModel({ log, type })
        return model.create({ data })
      }

      async function destroy(params: { id: string, type: string }): Promise<void> {
        const { id, type } = params
        const model = models.getModel({ log, type })
        return model.destroy({ id })
      }

      async function detail(params: { id: string, type: string }): Promise<RepoResult> {
        const { id, type } = params
        const model = models.getModel({ log, type })
        return model.detail({ id })
      }

      async function list(params: {
        filters: unknown,
        page: unknown,
        sort: unknown,
        type: string,
      }): Promise<RepoResult> {
        const { filters, page, sort, type } = params
        const model = models.getModel({ log, type })
        return model.list({ filters, page, sort })
      }

      async function update(params: {
        data: unknown,
        id: string,
        type: string,
      }): Promise<RepoResult> {
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
