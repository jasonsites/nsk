/**
 * @file domain/index.ts
 * @overview domain logic
 * NOTE: this module should be renamed to reflect the actual domain
 */

import type { Correlation, ExternalService, Repository } from '../types/globals'

interface Dependencies {
  repo: { context: (correlation: Correlation) => Repository }
  services: { example: ExternalService }
}

export default function domain(deps: Dependencies) {
  const { repo, services } = deps

  const { example } = services

  // TODO: domain logger

  return {
    context: (correlation: Correlation) => {
      const repository: Repository = repo.context(correlation)

      async function create(params: { data: unknown, type: string }) {
        const { data, type } = params
        return repository.create({ data, type })
      }

      async function destroy(params: { id: string, type: string }) {
        const { id, type } = params
        return repository.destroy({ id, type })
      }

      async function detail(params: { id: string, type: string }) {
        const { id, type } = params
        await example.context(correlation).get()
        return repository.detail({ id, type })
      }

      async function list(params: {
        filters: unknown,
        page: unknown,
        sort: unknown,
        type: string,
      }) {
        const { filters, page, sort, type } = params
        return repository.list({ filters, page, sort, type })
      }

      async function update(params: { data: unknown, id: string, type: string }) {
        const { data, id, type } = params
        return repository.update({ data, id, type })
      }

      return { create, destroy, detail, list, update }
    },
  }
}

export const inject = {
  name: 'domain',
  require: {
    repo: 'repo',
    services: {
      example: 'services/example',
    },
  },
}
