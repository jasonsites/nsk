/**
 * @file entity/attribute utilities
 */

import type { CreateFieldMapParams, EntityUtilities } from './types'

export default function utilities(): EntityUtilities {
  function createFieldMap(params: CreateFieldMapParams): Record<string, string> {
    const { attributes, entity } = params
    return Object.entries(attributes).reduce((memo: Record<string, string>, [key, attr]) => {
      memo[key as keyof typeof memo] = `${entity}.${attr}`
      return memo
    }, {})
  }

  const Entity: Record<string, string> = {
    Resource: 'resource_entity',
  }

  return {
    createFieldMap,
    Entity,
  }
}

export const inject = {}
