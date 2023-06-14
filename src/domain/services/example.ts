/**
 * @file example domain service
 */

import config from 'config'

import type { Correlation } from '../../types/core'
import type { DomainModel } from '../../types/domain-models'
import type { DomainServiceWithContext } from '../../types/domain-services'
import type { LoggerConfiguration, ScopedLogger } from '../../types/logger'
import type { ExternalService } from '../../types/services'
import type { RepositoryModule, Repository } from '../../types/repository'


interface Dependencies {
  externalService: ExternalService
  logger: ScopedLogger
  repository: RepositoryModule
}

export default function service(deps: Dependencies): DomainServiceWithContext {
  const { externalService, logger, repository } = deps

  const { enabled, label, level }: LoggerConfiguration = config.get('logger.domain')

  return {
    context: (correlation: Correlation) => {
      const { req_id } = correlation

      const log: ScopedLogger = logger.child({ module: label, req_id, level })
      log.enabled = enabled

      const repo: Repository = repository.context(correlation)

      async function create(params: { data: unknown }): Promise<DomainModel | void> {
        const { data } = params
        // pre-repo domain logic here
        const result = await repo.create({ data })
        // post-repo domain logic here
        return result
      }

      async function destroy(params: { id: string, type: string }): Promise<void> {
        const { id } = params
        // pre-repo domain logic here
        return repo.destroy({ id })
      }

      async function detail(params: {
        id: string
        type: string
      }): Promise<DomainModel | void> {
        const { id } = params
        // pre-repo domain logic here
        // external service request example
        await externalService.context(correlation).get()
        const result = repo.detail({ id })
        // post-repo domain logic here
        return result
      }

      async function list(params: {
        filters: unknown,
        page: unknown,
        sort: unknown,
        type: string,
      }): Promise<DomainModel | void> {
        const { filters, page, sort } = params
        // pre-repo domain logic here
        const result = repo.list({ filters, page, sort })
        // post-repo domain logic here
        return result
      }

      async function update(params: {
        data: unknown,
        id: string,
        type: string,
      }): Promise<DomainModel | void> {
        const { data, id } = params
        // pre-repo domain logic here
        const result = repo.update({ data, id })
        // post-repo domain logic here
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
