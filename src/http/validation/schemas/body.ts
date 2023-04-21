/**
 * @file validation/schemas/common.ts
 * @overview common schemas across types
 */

import joi from 'joi'

import type { CoreTypes } from '../../../types/globals'
import type {
  BodyHandler,
  BodySchemaBuilder,
  BodySchemaGetter,
  HTTPBodyMethod,
} from './types'

export default function body(): BodyHandler {
  function createSchemaGetter(params: {
    builder: BodySchemaBuilder,
    core: CoreTypes,
  }): BodySchemaGetter {
    const { core, builder } = params

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
