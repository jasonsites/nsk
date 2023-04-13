/**
 * @file repo/entities/index.ts
 * @overview repository entities
 */

export default function index({ entities }) {
  return entities
}

export const inject = {
  name: 'entities',
  require: {
    entities: {
      ResourceEntity: 'repo/entities/resource',
    },
  },
}
