/**
 * @file repo/entities/common.ts
 * @overview common entity/attribute definitions
 */

import type { CreateFieldMapParams } from '../types'

export default function common() {
  function CreateFieldMap(params: CreateFieldMapParams): Record<string, string> {
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
    CreateFieldMap,
    Entity,
  }
}

export const inject = {}
