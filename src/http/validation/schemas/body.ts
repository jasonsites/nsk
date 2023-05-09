/**
 * @file common schemas across types
 */

import joi from 'joi'

import type { CoreTypes } from '../../../types/core'
import type {
  BodyHandler,
  BodySchemaBuilder,
  BodySchemaGetter,
  HTTPBodyMethod,
} from '../types'

type CreateSchemaGetterParams = {
  builder: BodySchemaBuilder,
  core: CoreTypes,
}

export default function body(): BodyHandler {
  function createSchemaGetter(params: CreateSchemaGetterParams): BodySchemaGetter {
    const { builder, core } = params

    return ({ method }: { method: HTTPBodyMethod }) => {
      const partial = builder({ core, method })

      return joi.object().keys({
        meta: joi.object(),
        data: joi.object().keys(partial).required(),
      }).required()
    }
  }

  return { createSchemaGetter }
}

export const inject = {}
