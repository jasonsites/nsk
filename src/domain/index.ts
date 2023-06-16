/**
 * @file domain/business logic module
 */

import type { CoreTypes } from '../types/core'
import type { DomainModule, DomainServiceModule } from '../types/domain/services'


interface Dependencies {
  core: CoreTypes
  services: { example: DomainServiceModule }
}

export default function domain(deps: Dependencies): DomainModule {
  const { core, services } = deps
  const { InternalServerError, model } = core

  function service(type: string): DomainServiceModule {
    switch (type) {
      case model.example:
        return services.example
      default:
        throw new InternalServerError(`invalid domain service type: '${type}'`)
    }
  }

  return { service }
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
