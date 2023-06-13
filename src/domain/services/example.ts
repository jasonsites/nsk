/**
 * @file example domain service
 */

import config from 'config'

import type { Correlation } from '../../types/core'
import type { DomainModelComposite } from '../../types/domain-models'
import type { DomainService } from '../../types/domain-services'
import type { LoggerConfiguration, ScopedLogger } from '../../types/logger'
import type { ExternalService } from '../../types/services'
import type { RepositoryModule, Repository } from '../../types/repository'


interface Dependencies {
  externalService: ExternalService
  logger: ScopedLogger
  repository: RepositoryModule
}

export default function service(deps: Dependencies): DomainService {
  const { externalService, logger, repository } = deps

  const { enabled, label, level }: LoggerConfiguration = config.get('logger.domain')

  return {
    context: (correlation: Correlation) => {
      const { req_id } = correlation

      const log: ScopedLogger = logger.child({ module: label, req_id, level })
      log.enabled = enabled

      const repo: Repository = repository.context(correlation)

      async function create(params: { data: unknown }): Promise<DomainModelComposite | void> {
        const { data } = params
        const result = await repo.create({ data })
        // domain logic here
        return result
      }

      async function destroy(params: { id: string, type: string }): Promise<void> {
        const { id } = params
        return repo.destroy({ id })
      }

      async function detail(params: {
        id: string
        type: string
      }): Promise<DomainModelComposite | void> {
        const { id } = params
        await externalService.context(correlation).get()
        const result = repo.detail({ id })
        // domain logic here
        return result
      }

      async function list(params: {
        filters: unknown,
        page: unknown,
        sort: unknown,
        type: string,
      }): Promise<DomainModelComposite | void> {
        const { filters, page, sort } = params
        const result = repo.list({ filters, page, sort })
        // domain logic here
        return result
      }

      async function update(params: {
        data: unknown,
        id: string,
        type: string,
      }): Promise<DomainModelComposite | void> {
        const { data, id } = params
        const result = repo.update({ data, id })
        // domain logic here
        return result
      }

      return { create, destroy, detail, list, update }
    },
  }
}

export const inject = {
  require: {
    externalService: 'external/service',
    logger: 'logger',
    repository: 'repository/models/example/repo',
  },
}
