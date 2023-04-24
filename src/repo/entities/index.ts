/**
 * @file repo/entities/index.ts
 * @overview repository entity definitions
 */

import type { EntityData } from '../types'

interface Dependencies {
  entities: Record<string, EntityData>
}

export default function index({ entities }: Dependencies) {
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
