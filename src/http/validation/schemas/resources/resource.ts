/**
 * @file validation/schemas/domain.ts
 * @overview domain schemas
 */

import joi from 'joi'

import type { BodyHandler, DataSchema, HTTPBodyMethod } from '../types'
import type { CoreTypes } from '../../../../types/globals'

type Dependencies = {
  body: BodyHandler,
  core: CoreTypes,
}

export default function domainResource(deps: Dependencies) {
  const { body, core } = deps
  const { createSchemaGetter } = body

  /**
   * example domain resource schema builder
   */
  function builder({ method }: { method: HTTPBodyMethod }): DataSchema {
    const resource = {
      type: joi.string().valid(core.Resource.DomainResource).required(),
      id: (method === 'PUT') ? joi.string().uuid().required() : undefined,
      properties: joi.object().keys({
        description: joi.string(),
        enabled: joi.boolean(),
        status: joi.number(),
        title: joi.string().required().max(255),
      }).required(),
    }

    return resource
  }

  return createSchemaGetter({ builder, core })
}

export const inject = {
  require: {
    body: 'http/validation/schemas/body',
    core: 'core',
  },
}
