/**
 * @file validation/schemas/index.ts
 * @overview validation schemas
 */

import type { CoreTypes } from '../../../types/globals'
import { BodySchemaGetter, HTTPBodyMethod, QueryHandler } from './types'

type Dependencies = {
  core: CoreTypes,
  query: QueryHandler,
  resources: Record<string, BodySchemaGetter>,
}

export default function schemas(deps: Dependencies) {
  const { core, query, resources } = deps

  const { Resource } = core
  const { querySchema } = query
  const { resource } = resources

  function bodySchema(params: { method: HTTPBodyMethod, type: string }) {
    const { method, type } = params

    switch (type) {
      case Resource.DomainResource: return resource({ method })
      default: throw new Error(`invalid schema type '${type}'`)
    }
  }

  return { bodySchema, querySchema }
}

export const inject = {
  require: {
    core: 'core',
    query: 'http/validation/schemas/query',
    resources: {
      resource: 'http/validation/schemas/resources/resource',
    },
  },
}
