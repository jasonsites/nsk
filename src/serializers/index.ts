/**
 * @file http response serializers
 */

import { get } from 'lodash'

import type { CoreTypes } from '../types/core'
import { DomainModel, DomainModelMetadata, DomainObject } from '../types/domain-models'
import type { Result, Serializer } from './types'

interface Dependencies {
  core: CoreTypes,
  resources: {
    example: Serializer
  },
}

export default function serializers(deps: Dependencies) {
  const { core, resources } = deps
  const { example } = resources

  function serialize(params: { model: DomainModel, type: string }) {
    const { model, type } = params
    const { data, meta } = model

    const result: Result = {}
    if (meta) result.meta = serializeMeta({ meta })
    if (data) result.data = serializeData({ model, type })

    return JSON.stringify(result)
  }

  function serializeData(params: { model: DomainModel, type: string }) {
    const { model: { data, solo }, type } = params

    if (!Array.isArray(data)) {
      throw new Error('serializer input data must be an array')
    }

    const { length } = data

    // single resource
    if (solo) {
      if (length !== 1) {
        throw new Error(`serializer input data with length '${length}' must contain one and only one resource for single resource serialization`)
      }
      const [obj] = data
      return serializeObject({ obj, type })
    }

    // resource list
    if (length === 0) return data
    return data.reduce((memo: any[], obj) => {
      memo.push(serializeObject({ obj, type }))
      return memo
    }, [])
  }

  function serializeMeta(params: { meta: DomainModelMetadata }) {
    const { meta } = params
    const total = get(meta, 'paging.total', undefined)
    if (total) meta.paging.total = total
    return meta
  }

  function serializeObject(params: { obj: DomainObject, type: string }) {
    const { obj, type } = params
    console.log('typeof obj', typeof obj)

    switch (type) {
      case core.model.example:
        return example.serialize({ obj, type })
      default:
        throw new Error(`invalid resource type '${type}'`)
    }
  }

  return { serialize }
}

export const inject = {
  name: 'serializers',
  require: {
    core: 'core',
    resources: {
      example: 'serializers/example',
    },
  },
}
