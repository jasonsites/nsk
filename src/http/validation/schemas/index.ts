/**
 * @file validation schemas
 */

import type { CoreTypes } from '../../../types/core'
import type { BodySchemaGetter, HTTPBodyMethod, QueryHandler } from '../types'

interface Dependencies {
  core: CoreTypes
  query: QueryHandler
  resources: Record<string, BodySchemaGetter>
}

export default function schemas(deps: Dependencies) {
  const { core, query, resources } = deps

  const { model } = core
  const { querySchema } = query
  const { exampleResource } = resources

  function bodySchema(params: { method: HTTPBodyMethod, type: string }) {
    const { method, type } = params

    switch (type) {
      case model.example: return exampleResource({ method })
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
      exampleResource: 'http/validation/schemas/resources/example',
    },
  },
}
