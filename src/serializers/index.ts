/**
 * @file http response serializers
 */

import { get } from 'lodash'

import type { CoreTypes } from '../types/core'
import type { PagingData } from '../types/pagination'

interface Dependencies {
  core: CoreTypes,
  types: {
    serializeDomainResource: (params: { record: any, type: string }) => any,
  },
}

export default function serializers(deps: Dependencies) {
  const { core, types } = deps
  const { Resource } = core

  type InputDataResource = {
    type: string,
    meta?: unknown,
    record: unknown,
    rel?: { type: string, data: unknown[] }[],
  }

  type InputData = InputDataResource[]

  type InputMeta = { paging: PagingData }

  type SerializableInput = {
    data: InputData,
    meta?: InputMeta,
  }

  function serialize(params: { input: SerializableInput, solo: boolean }) {
    const { input, solo } = params
    const { data, meta } = input

    // TODO: placeholder
    type Result = {
      meta?: any,
      data?: any,
    }

    const result: Result = {}
    if (meta) result.meta = serializeMeta({ meta })
    if (data) result.data = serializeData({ data, solo })

    return JSON.stringify(result)
  }

  function serializeMeta({ meta }: { meta: InputMeta }) {
    const total = get(meta, 'paging.total', undefined)
    if (total) meta.paging.total = total
    return meta
  }

  function serializeData(params: { data: InputData, solo: boolean }) {
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
      const [resource] = data
      return serializeRecord(resource)
    }

    // resource list
    if (length === 0) return data
    return data.reduce((memo: any[], resource) => {
      memo.push(serializeRecord(resource))
      return memo
    }, [])
  }

  /**
   * @param {object}    params.meta   - resource entity metadata
   * @param {boolean}   params.record - resource entity fields
   * @param {object[]}  params.rel    - related resource entities
   * @param {string}    params.type   - resource type
   * @return {object}
   * @private
   */
  function serializeRecord(params: InputDataResource) {
    const { record, type } = params

    switch (type) {
      case Resource.DomainResource:
        return types.serializeDomainResource({ record, type })
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
    types: 'serializers/types',
  },
}
