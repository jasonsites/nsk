/**
 * @file repo/entities/resource/index.js
 * @overview resource entity
 */

export default function entity({ common }) {
  const { CreateFieldMap, Entity } = common

  const Attribute = {
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
