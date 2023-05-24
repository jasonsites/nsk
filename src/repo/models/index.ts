/**
* @file repository entity models
*/

import type { CoreTypes } from '../../types/core'
import type { ScopedLogger } from '../../types/logger'
import type { Repository } from '../../types/repository'
import type { EntityModelConstructor } from './types'

interface Dependencies {
  core: CoreTypes,
  models: Record<string, EntityModelConstructor>,
}

export default function index(deps: Dependencies) {
  const { core, models } = deps
  const { InternalServerError } = core

  function getEntityModel(params: { log: ScopedLogger, type: string }): Repository {
    const { log, type } = params
    switch (type) {
      case core.model.example: return models.example({ log })
      default: throw new InternalServerError(`invalid resource type '${type}'`)
    }
  }

  return { getEntityModel }
}

export const inject = {
  require: {
    core: 'core',
    models: {
      example: 'repo/models/example',
    },
  },
}
