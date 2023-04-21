/**
 * @file repo/entities/common.ts
 * @overview common entity/attribute definitions
 */

import type { CreateFieldMapParams } from '../types'

export default function common() {
  /**
   * creates a Field map for a single Entity
   * @param {object} params.attributes  - Entity Attribute map (map[string]string)
   * @param {string} params.entity      - entity (table) name
   * @return {object}
   */
  function CreateFieldMap(params: CreateFieldMapParams): Record<string, string> {
    const { attributes, entity } = params
    return Object.entries(attributes).reduce((memo: Record<string, string>, [key, attr]) => {
      memo[key as keyof typeof memo] = `${entity}.${attr}`
      return memo
    }, {})
  }

  /**
   * database entities
   * @readonly
   */
  const Entity: Record<string, string> = {
    Resource: 'resource_entity',
  }

  return {
    CreateFieldMap,
    Entity,
  }
}

export const inject = {}
