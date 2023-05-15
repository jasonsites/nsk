import chance from '../chance'

import type { CoreTypes } from '../../../src/types/core'

export function domainResource(core: CoreTypes, params: any = {}) {
  const defaults = {
    description: chance.sentence(),
    enabled: chance.bool(),
    status: chance.integer({ min: 0, max: 4 }),
    title: chance.word({ length: 8 }),
  }

  params = { ...defaults, ...params }

  const { description, enabled, id, status, title } = params

  const resource: any = {
    type: core.DomainModel.ExampleDomainModel,
    properties: {
      description,
      enabled,
      status,
      title,
    },
  }

  if (id) resource.id = id

  return resource
}

export function domainResourceBody(core: CoreTypes, params = {}) {
  return { data: domainResource(core, params) }
}
