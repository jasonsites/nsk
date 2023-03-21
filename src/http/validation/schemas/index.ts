/**
 * @file validation/schemas/index.ts
 * @overview validation schemas
 */

export default function schemas({ body, core, query }) {
  const { domain } = body
  const { Resource } = core
  const { querySchema } = query

  /**
   * retrieve joi validation schema for POST/PATCH request bodies
   * @param  {String} params.method - http request method
   * @param  {String} params.type   - resource type
   * @return {Object}
   */
  function bodySchema({ method, type }) {
    switch (type) {
      case Resource.DomainResource: return domain({ method })
      default: throw new Error(`invalid schema type '${type}'`)
    }
  }

  return { bodySchema, querySchema }
}

export const inject = {
  require: {
    body: {
      domain: 'http/validation/schemas/body/domain',
    },
    core: 'core',
    query: 'http/validation/schemas/query',
  },
}
