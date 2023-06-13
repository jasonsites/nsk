/**
 * @file resource entity definition
 */

import type { EntityUtilities } from './types'

interface Dependencies {
  utils: EntityUtilities
}

export default function example({ utils }: Dependencies) {
  const { createFieldMap, entity } = utils

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

  const field = createFieldMap({ attributes: attributeSchema, entity: entity.example })
  const fields = Object.values(field)
  const table = entity.example

  return { field, fields, table }
}

export const inject = {
  require: {
    utils: 'repository/entities/utils',
  },
}
