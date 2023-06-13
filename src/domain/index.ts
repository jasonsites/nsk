/**
 * @file domain/business logic module
 */

import { CoreTypes } from '../types/core'
import type { DomainModule, DomainService } from '../types/domain-services'

interface Dependencies {
  core: CoreTypes
  services: { example: DomainService }
}

export default function domain(deps: Dependencies): DomainModule {
  const { core, services } = deps
  const { InternalServerError, model } = core

  function getService(type: string): DomainService {
    switch (type) {
      case model.example:
        return services.example
      default:
        throw new InternalServerError(`unknown domain service type: '${type}'`)
    }
  }

  return { getService }
}

export const inject = {
  name: 'domain',
  require: {
    core: 'core',
    services: {
      example: 'domain/services/example',
    },
  },
}
