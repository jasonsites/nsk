/**
 * @file http response serializers
 */

import { get } from 'lodash'

import type { DomainModel, DomainModelMetadata, DomainObject } from '../../../types/domain/models'
import type { DomainModelMarshaller, DomainObjectMarshaller } from '../../../types/domain/serializers'
import type { Resource, ResourceData, ResourceMetadata } from '../../../types/resources'

interface Dependencies {
  marshallers: Record<string, DomainObjectMarshaller>
}

export default function marhallers(deps: Dependencies): DomainModelMarshaller {
  const { marshallers } = deps
  const { example } = marshallers

  function marshal(params: { model: DomainModel }): Resource {
    const { model } = params
    const { data, meta } = model

    const resource: Resource = { data: [] }
    if (meta) resource.meta = marshalMetadata({ meta })
    if (data.length > 0) resource.data = marshalData({ model })

    return resource
  }

  function marshalData(params: { model: DomainModel }): ResourceData | ResourceData[] {
    const { model: { data, solo } } = params

    if (!Array.isArray(data)) {
      throw new Error('serializer input data must be an array')
    }

    const { length } = data

    // single object
    if (solo) {
      if (length !== 1) {
        throw new Error(`serializer input data with length '${length}' must contain one and only one resource for single resource serialization`)
      }
      const [domainObject] = data
      return marshalDataObject(domainObject)
    }

    // resource list
    return data.reduce((memo: ResourceData[], domainObject) => {
      memo.push(marshalDataObject(domainObject))
      return memo
    }, [])
  }

  function marshalDataObject(data: DomainObject): ResourceData {
    const { type } = data

    switch (type) {
      case 'example': // TODO
        return example.marshal(data)
      default:
        throw new Error(`invalid resource type '${type}'`)
    }
  }

  function marshalMetadata(params: { meta: DomainModelMetadata }): ResourceMetadata {
    const { meta } = params
    const total = get(meta, 'paging.total', undefined)
    if (total) meta.paging.total = total
    return meta
  }

  return { marshal }
}

export const inject = {
  require: {
    core: 'core',
    marshallers: {
      example: 'domain/serializers/marshallers/example',
    },
  },
}
