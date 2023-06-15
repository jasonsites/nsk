/**
 * @file entity definitions
 */

import type { EntityData } from './types'

interface Dependencies {
  entities: Record<string, EntityData>
}

export default function index({ entities }: Dependencies): Record<string, EntityData> {
  return entities
}

export const inject = {
  name: 'entities',
  require: {
    entities: {
      example: 'repository/entities/example',
    },
  },
}
