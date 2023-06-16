/**
 * @file http response serializers
 */

import type { CoreTypes } from '../../types/core'
import type { DomainModel } from '../../types/domain/models'
import type {
  DomainModelMarshaller,
  Serializer,
  SerializerFormat,
  SerializerOutput,
} from '../../types/domain/serializers'
import type { Resource } from '../../types/resources'

interface Dependencies {
  core: CoreTypes
  marshaller: DomainModelMarshaller
}

export default function serializers(deps: Dependencies): Serializer {
  const { core: { InternalServerError }, marshaller: { marshal } } = deps

  function serialize(params: { format?: SerializerFormat, model: DomainModel }): SerializerOutput {
    const { format = 'json', model } = params
    switch (format) {
      case 'json':
        return serializeJSON({ model })
      default:
        throw new InternalServerError(`serialization format '${format}' not supported`)
    }
  }

  function serializeJSON(params: { model: DomainModel }): string {
    const { model } = params
    const resource: Resource = marshal({ model })
    return JSON.stringify(resource)
  }

  return { serialize }
}

export const inject = {
  name: 'serializers',
  require: {
    core: 'core',
    marshaller: 'domain/serializers/marshallers/index',
  },
}
