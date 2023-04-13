/**
 * @file http/serializers/index.js
 * @overview http response serializers
 */

import { get } from 'lodash'

export default function serializers({ core, types }) {
  const { Resource } = core

  /*
  {
    meta: {
      paging: {
        limit,
        offset,
        total
      }
    },
    data: [{
      type: 'resource-type',
      meta: {
        ...resource entity metadata
      },
      record: {
        ...resource entity fields
      },
      rel: [{
        type: 'rel-type',
        data: [{
          ...related resource entity fields
        }],
      }],
    }]
  }
  */

  /**
   * @param {object[]}  params.input  - configured input data
   * @param {boolean}   params.solo   - serialize as single resource (true) or list (false)
   * @return {object}
   */
  function serialize({ input, solo }) {
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

  function serializeMeta({ meta }) {
    const total = get(meta, 'paging.total', undefined)
    const totalUnfiltered = get(meta, 'paging.total_unfiltered', undefined)
    if (total) meta.paging.total = parseInt(total, 10)
    if (totalUnfiltered) meta.paging.total_unfiltered = parseInt(totalUnfiltered, 10)
    return meta
  }

  function serializeData({ data, solo }) {
    if (!Array.isArray(data)) {
      throw new Error('serializer input data must be an array')
    }

    const { length } = data

    // single resource
    if (solo) {
      if (length !== 1) {
        throw new Error(`serializer input data with length '${length}' must contain one and only one resource for single resource serialization`)
      }
      const [params] = data
      return serializeRecord(params)
    }

    // resource list
    if (length === 0) return data
    return data.reduce((memo, params) => {
      memo.push(serializeRecord(params))
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
  function serializeRecord(params) {
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
