/**
 * @file validation/schemas/index.ts
 * @overview validation schemas
 */

export default function schemas({ body, core, query }) {
  const { resource } = body
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
      case Resource.DomainResource: return resource({ method })
      default: throw new Error(`invalid schema type '${type}'`)
    }
  }

  return { bodySchema, querySchema }
}

export const inject = {
  require: {
    body: {
      resource: 'http/validation/schemas/body/resource',
    },
    core: 'core',
    query: 'http/validation/schemas/query',
  },
}
