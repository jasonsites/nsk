/**
 * @file serializers/index.ts
 * @overview
 */

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
        ...resource metadata
      },
      properties: {
        ...resource properties
      },
      rel: [{
        type: 'rel-type',
        data: [{
          ...rel-resource
        }],
      }],
    }]
  }
  */

  /**
   * @param {Object[]}  params.input  - configured input data
   * @param {Boolean}   params.single - serialize as single resource (true) or list (false)
   * @return {Object}
   */
  function serialize({ input, single }) {
    const { data, meta } = input

    type Result = {
      meta?: any,
      data?: any,
    }

    const result: Result = {}
    if (meta) result.meta = serializeMeta({ meta })
    if (data) result.data = serializeData({ data, single })

    return JSON.stringify(result)
  }

  function serializeMeta({ meta }) {
    const total = meta?.paging?.total
    if (total) meta.paging.total = parseInt(total, 10)
    return meta
  }

  function serializeData({ data, single }) {
    if (!Array.isArray(data)) {
      throw new Error('serializer input data must be an array')
    }

    const { length } = data

    // single resource
    if (single) {
      if (length !== 1) {
        throw new Error(`serializer input data with length '${length}' must contain one and only one resource for single resource serialization`)
      }
      const [params] = data
      return serializeProperties(params)
    }

    // resource list
    if (length === 0) return data
    return data.reduce((memo, params) => {
      memo.push(serializeProperties(params))
      return memo
    }, [])
  }

  /**
   * @private
   */
  function serializeProperties({ id, meta, properties, rel, type }) {
    switch (type) {
      case Resource.DomainResource:
        return types.serializeDomainResource({ id, meta, properties, rel, type })
      default:
        throw new Error(`invalid resource type ${type}`)
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
