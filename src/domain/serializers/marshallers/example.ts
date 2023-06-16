/**
 * @file example domain model serializer
 */

import type { DomainObject } from '../../../types/domain/models'
import type { DomainObjectMarshaller } from '../../../types/domain/serializers'
import type { ResourceData } from '../../../types/resources'

export default function marshaller(): DomainObjectMarshaller {
  function marshal(domainObject: DomainObject): ResourceData {
    const { attributes, type } = domainObject

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

  return { marshal }
}

export const inject = {}
