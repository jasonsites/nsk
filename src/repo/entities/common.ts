/**
 * @file repo/entities/common.ts
 * @overview common entity/attribute definitions
 */

export default function common() {
  /**
   * creates a Field map for a single Entity
   * @param {object} params.attributes  - Entity Attribute map (map[string]string)
   * @param {string} params.entity      - entity (table) name
   * @return {object}
   */
  function CreateFieldMap({ attributes, entity }) {
    return Object.entries(attributes).reduce((memo, [key, attr]) => {
      memo[key] = `${entity}.${attr}`
      return memo
    }, {})
  }

  /**
   * database entities
   * @readonly
   */
  const Entity = {
    Resource: 'resource_entity',
  }

  return {
    CreateFieldMap,
    Entity,
  }
}

export const inject = {}
