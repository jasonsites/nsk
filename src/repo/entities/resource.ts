/**
 * @file repo/entities/resource.ts
 * @overview resource entity definition
 */

import type { CreateFieldMapParams } from '../types'

interface Dependencies {
  common: {
    CreateFieldMap: ({ attributes, entity }: CreateFieldMapParams) => Record<string, string>
    Entity: Record<string, string>
  }
}

export default function resource({ common }: Dependencies) {
  const { CreateFieldMap, Entity } = common

  const Attribute: Record<string, string> = {
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

  const Field = CreateFieldMap({ attributes: Attribute, entity: Entity.Resource })
  const fields = Object.values(Field)
  const table = Entity.Resource

  return { Field, fields, table }
}

export const inject = {
  require: {
    common: 'repo/entities/common',
  },
}
