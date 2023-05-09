/**
 * @file resource entity definition
 */

import type { EntityUtilities } from './types'

interface Dependencies {
  utils: EntityUtilities
}

export default function resource({ utils }: Dependencies) {
  const { createFieldMap, Entity } = utils

  const attributeSchema: Record<string, string> = {
    CreatedBy: 'created_by',
    CreatedOn: 'created_on',
    Deleted: 'deleted',
    Description: 'description',
    Enabled: 'enabled',
    Id: 'id',
    ModifiedBy: 'modified_by',
    ModifiedOn: 'modified_on',
    Status: 'status',
    Title: 'title',
  }

  const Field = createFieldMap({ attributes: attributeSchema, entity: Entity.Resource })
  const fields = Object.values(Field)
  const table = Entity.Resource

  return { Field, fields, table }
}

export const inject = {
  require: {
    utils: 'repo/entities/utils',
  },
}
