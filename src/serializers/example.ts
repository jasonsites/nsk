/**
 * @file example domain model serializer
 */

import type { CoreTypes } from '../types/core'
import type { DomainObject } from '../types/domain-models'
import type { Serializer } from './types'

interface Dependencies {
  core: CoreTypes,
}

export default function serializer(deps: Dependencies): Serializer {
  const { core } = deps

  const type = core.model.example // TODO

  function serialize(params: { obj: DomainObject }) {
    const { obj } = params
    const { attributes } = obj

    const { id, ...fields } = attributes
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

export const inject = {
  require: {
    core: 'core',
  },
}
