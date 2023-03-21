/**
 * @file http/validation/schemas/query.js
 * @overview query schemas
 */

import joi from 'joi'

export default function query({ core }) {
  const { Resource } = core

  const allowedOptionTypes = []
  const allowedSortTypes = []
  const disallowedFilterTypes = []

  const validTypes = [
    Resource.DomainResource,
  ]

  function filtersSchema({ type }) {
    switch (type) {
      case Resource.DomainResource: return joi.object().required()
      default: throw new Error(`invalid type '${type}' for filter query`)
    }
  }

  function optionsSchema({ type }) {
    switch (type) {
      case Resource.DomainResource: return joi.object().required()
      default: throw new Error(`invalid type '${type}' for option query`)
    }
  }

  function pagingSchema() {
    return joi.object().keys({
      limit: joi.string(),
      offset: joi.string(),
    })
  }

  function querySchema({ method, type }) {
    if (!validTypes.includes(type)) {
      throw new Error(`invalid type '${type}' for query validation`)
    }

    const schema = { f: {}, o: {}, p: {}, s: {} }

    if (method === 'list') {
      schema.p = pagingSchema()
      if (!disallowedFilterTypes.includes(type)) {
        schema.f = filtersSchema({ type })
      }
      if (allowedSortTypes.includes(type)) {
        schema.s = sortingSchema({ type })
      }
    }

    if (allowedOptionTypes.includes(type)) {
      schema.o = optionsSchema({ type })
    }

    return joi.object().keys(schema)
  }

  function sortingSchema(params) {
    const valid = validSortProps(params)
    return joi.object().keys({
      order: joi.string().valid(['asc', 'desc']),
      prop: joi.string().valid(...valid),
    })
  }

  function validSortProps({ type }) {
    switch (type) {
      case Resource.DomainResource: return ['name']
      default: throw new Error(`invalid type '${type}' for sort query`)
    }
  }

  return { querySchema }
}

export const inject = {
  require: {
    core: 'core',
  },
}
