/**
* @file repository upsert composer utilities
*/

import { sql } from 'kysely'

import type { CoreTypes } from '../../types/core'
import type { ExampleResourceProperties } from '../../types/resources'
import type { EnforceUpsertFieldsParams, UpsertParams } from './types'

interface Dependencies {
  core: CoreTypes,
}

export default function composer(deps: Dependencies) {
  const { core: { model } } = deps

  function create(params: UpsertParams) {
    const { data, type } = params
    const user_id = 1 // TODO: get from context
    const entity = enforceUpsertFields({ data, type })
    return { ...entity, created_by: user_id }
  }

  function destroy() {
    const user_id = 1 // TODO: get from context
    return { deleted: true, modified_by: user_id, modified_on: sql`now()` }
  }

  function update(params: UpsertParams) {
    const { data, type } = params
    const user_id = 1 // TODO: get from context
    const entity = enforceUpsertFields({ data, type })
    return { ...entity, modified_by: user_id, modified_on: sql`now()` }
  }

  // field enforcement ---------------------------------------------------
  function enforceUpsertFields(params: EnforceUpsertFieldsParams) {
    const { data, type } = params
    switch (type) {
      case model.example: return exampleEntity({ data })
      default: throw new Error(`invalid entity type '${type}'`)
    }
  }

  // example entity
  function exampleEntity(params: { data: ExampleResourceProperties }) {
    const { data } = params
    const { description, enabled, status, title } = data
    return { description, enabled, status, title }
  }

  return { create, destroy, update }
}

export const inject = {
  require: {
    core: 'core',
  },
}
