/**
* @file repository entity model utilities
*/

import { sql } from 'kysely'

import type { CoreTypes } from '../../types/core'
import { PageMetadata } from '../../types/pagination'

interface Dependencies {
  core: CoreTypes,
}

export default function utilities(deps: Dependencies) {
  const { core: { NotFoundError, model } } = deps

  // list metadata for all models
  function composePagingData(params: {
    count: number,
    limit: number,
    offset: number,
  }): PageMetadata {
    const { count, limit, offset } = params
    return { limit, offset, total: count }
  }

  /**
   * returns insert/update object for repo entity operations
   * NOTE: implicitly relying on request validation to ensure data model integrity
   * @param {object} params.data    - resource data
   * @param {string} params.method  - entity operation
   * @param {string} params.type    - resource type
   * @returns {object}
   */
  function composeUpsert(params: { data: any, method: string, type: string }) {
    const { data, method = 'update', type } = params
    const user_id = 1 // TODO: get from context

    // destroy
    if (method === 'destroy') return softDelete({ user_id })

    // create or (implicit) update
    const entity = enforceUpsertFields({ data, type })
    if (method === 'create') return { ...entity, ...created({ user_id }) }
    return { ...entity, ...modified({ user_id }) }
  }

  // action augmentations ------------------------------------------------
  function created({ user_id }: { user_id: number }) {
    return { created_by: user_id }
  }

  function modified({ user_id }: { user_id: number }) {
    return { modified_on: sql`now()`, modified_by: user_id }
  }

  function softDelete({ user_id }: { user_id: number }) {
    return { deleted: true, ...modified({ user_id }) }
  }

  // field enforcement ---------------------------------------------------
  function enforceUpsertFields(params: { data: any, type: string }) {
    const { data, type } = params
    switch (type) {
      case model.example: return exampleEntity({ data })
      default: throw new Error(`invalid entity type '${type}'`)
    }
  }

  // example entity
  function exampleEntity({ data }: { data: any }) {
    const { description, enabled, status, title } = data
    return { description, enabled, status, title }
  }

  // error utilities -----------------------------------------------------
  // error
  function throwOnNotFound(params: {
    id: string,
    data: any,
    type: string,
  }): void {
    const { id, data, type = 'resource' } = params
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new NotFoundError(`unable to find ${type} with id '${id}'`)
    }
  }

  return { composePagingData, composeUpsert, throwOnNotFound }
}

export const inject = {
  require: {
    core: 'core',
  },
}
