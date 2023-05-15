/**
 * @file resource schema
 */

import joi from 'joi'

import type { BodyHandler, DataSchema, HTTPBodyMethod } from '../../types'
import type { CoreTypes } from '../../../../types/core'

interface Dependencies {
  body: BodyHandler,
  core: CoreTypes,
}

export default function domainResource(deps: Dependencies) {
  const { body, core } = deps
  const { createSchemaGetter } = body

  function builder({ method }: { method: HTTPBodyMethod }): DataSchema {
    const resource: DataSchema = {
      type: joi.string().valid(core.DomainModel.ExampleDomainModel).required(),
      properties: joi.object().keys({
        description: joi.string(),
        enabled: joi.boolean(),
        status: joi.number(),
        title: joi.string().required().max(255),
      }).required(),
    }
    if (method === 'PUT') resource.id = joi.string().uuid().required()

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
