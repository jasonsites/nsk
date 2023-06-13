/**
 * @file http response serializers
 */

import { get } from 'lodash'

import type { CoreTypes } from '../types/core'
import type {
  SerializableInputDataSingle,
  Result,
  SerializableInput,
  SerializableInputData,
  SerializableInputMeta,
  Serializer,
} from './types'

interface Dependencies {
  core: CoreTypes,
  resources: {
    example: Serializer
  },
}

// result {
//   data: [{ attributes: [Object], meta: null, related: [] }],
//     solo: true
// }


export default function serializers(deps: Dependencies) {
  const { core, resources } = deps
  const { example } = resources

  function serialize(params: { input: SerializableInput, solo: boolean }) {
    const { input, solo } = params
    const { data, meta } = input

    const result: Result = {}
    if (meta) result.meta = serializeMeta({ meta })
    if (data) result.data = serializeData({ data, solo })

    return JSON.stringify(result)
  }

  function serializeData(params: { data: SerializableInputData, solo: boolean }) {
    const { data, solo } = params

    if (!Array.isArray(data)) {
      throw new Error('serializer input data must be an array')
    }

    const { length } = data

    // single resource
    if (solo) {
      if (length !== 1) {
        throw new Error(`serializer input data with length '${length}' must contain one and only one resource for single resource serialization`)
      }
      const [record] = data
      return serializeRecord(record)
    }

    // resource list
    if (length === 0) return data
    return data.reduce((memo: any[], record) => {
      memo.push(serializeRecord(record))
      return memo
    }, [])
  }

  function serializeMeta({ meta }: { meta: SerializableInputMeta }) {
    const total = get(meta, 'paging.total', undefined)
    if (total) meta.paging.total = total
    return meta
  }

  function serializeRecord(params: SerializableInputDataSingle) {
    // TODO: here is the implicit conversion from record to model
    const { record: model, type } = params

    switch (type) {
      case core.model.example:
        return example.serialize({ model, type })
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
