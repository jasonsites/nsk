/**
 * @file http/serializers/types.ts
 * @overview
 */

type DomainResource = {
  id: string,
  title: string,
  description: string,
  status: string,
  enabled: boolean,
  created_on: string,
  created_by: string,
  modified_on: string,
  modified_by: string,
}

type Resource = DomainResource

export default function types() {
  function serializeDomainResource(params: { record: Resource, type: string }) {
    const { record, type } = params

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
