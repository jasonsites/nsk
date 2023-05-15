/**
 * @file example domain model serializer
 */

import type { DomainModel, Serializer } from './types'

export default function serializer(): Serializer {
  function serialize(params: { model: DomainModel, type: string }) {
    const { model, type } = params

    const { id, ...fields } = model
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

  return { serialize }
}

export const inject = {}
