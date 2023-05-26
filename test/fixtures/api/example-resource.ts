import chance from '../chance'

import type { CoreTypes } from '../../../src/types/core'

export function exampleResource(core: CoreTypes, params: any = {}) {
  const defaults = {
    description: chance.sentence(),
    enabled: chance.bool(),
    status: chance.integer({ min: 0, max: 4 }),
    title: chance.word({ length: 8 }),
  }

  params = { ...defaults, ...params }

  const { description, enabled, id, status, title } = params

  const resource: any = {
    type: core.model.example,
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

export function exampleResourceBody(core: CoreTypes, params = {}) {
  return { data: exampleResource(core, params) }
}
