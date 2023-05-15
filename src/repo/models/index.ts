/**
* @file repository entity models
*/

import type { CoreTypes } from '../../types/core'
import type { ScopedLogger } from '../../types/logger'
import type { EntityModel, Model } from './types'

interface Dependencies {
  core: CoreTypes,
  models: Record<string, EntityModel>,
}

export default function index(deps: Dependencies) {
  const { core, models } = deps
  const { InternalServerError } = core

  function getModel(params: { log: ScopedLogger, type: string }): Model {
    const { log, type } = params
    switch (type) {
      case core.DomainModel.ExampleDomainModel: return models.domainResource({ log })
      default: throw new InternalServerError(`invalid resource type '${type}'`)
    }
  }

  return { getModel }
}

export const inject = {
  require: {
    core: 'core',
    models: {
      domainResource: 'repo/models/resource',
    },
  },
}
