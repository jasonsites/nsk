/**
 * @file query schemas
 */

import joi from 'joi'

import type { CoreTypes } from '../../../types/core'

interface Dependencies {
  core: CoreTypes
}

export default function query(deps: Dependencies) {
  const { core: { model } } = deps

  const allowedOptionTypes: string[] = []
  const allowedSortTypes: string[] = []
  const disallowedFilterTypes: string[] = []

  const validTypes = [
    model.example,
  ]

  function filtersSchema({ type }: { type: string }) {
    switch (type) {
      case model.example: return joi.object().required()
      default: throw new Error(`invalid type '${type}' for filter query`)
    }
  }

  function optionsSchema({ type }: { type: string }) {
    switch (type) {
      case model.example: return joi.object().required()
      default: throw new Error(`invalid type '${type}' for options query`)
    }
  }

  function pagingSchema() {
    return joi.object().keys({
      limit: joi.string(),
      offset: joi.string(),
    })
  }

  function querySchema(params: { list: boolean, type: string }) {
    const { list, type } = params

    if (!validTypes.includes(type)) {
      throw new Error(`invalid type '${type}' for query validation`)
    }

    const schema = { f: {}, o: {}, p: {}, s: {} }

    if (list) {
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

  function sortingSchema(params: { type: string }) {
    const valid = validSortProps(params)
    return joi.object().keys({
      order: joi.string().valid(['asc', 'desc']),
      prop: joi.string().valid(...valid),
    })
  }

  function validSortProps({ type }: { type: string }) {
    switch (type) {
      case model.example: return ['name']
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
