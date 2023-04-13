/**
 * @file http/serializers/types.ts
 * @overview
 */

export default function types() {
  function serializeDomainResource({ record, type }) {
    const { id, ...fields } = record
    const {
      created_by,
      created_on,
      description,
      enabled,
      modified_by,
      modified_on,
      status,
      title,
    } = fields

    const properties = {
      title,
      description,
      status,
      enabled,
      created_on,
      created_by,
      modified_on,
      modified_by,
    }

    return { type, id, properties }
  }

  return { serializeDomainResource }
}

export const inject = {}
