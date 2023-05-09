/**
 * @file validation schemas types
 */

import type { ObjectSchema, StringSchema } from 'joi'
import type { CoreTypes } from '../../../types/core'

export type BodySchemaBuilder = (params: {
  core: CoreTypes,
  method: HTTPBodyMethod,
}) => DataSchema

export type BodySchemaGetter = (params: {
  method: HTTPBodyMethod,
}) => ObjectSchema<unknown>

export type BodyHandler = {
  createSchemaGetter: (params: {
    builder: BodySchemaBuilder,
    core: CoreTypes,
  }) => BodySchemaGetter,
}

export type DataSchema = {
  type: StringSchema<string>,
  id?: StringSchema<string>,
  properties: ObjectSchema<unknown>
}

export type HTTPBodyMethod = 'POST' | 'PUT'

export type QueryHandler = {
  querySchema: (params: { method: string, type: string }) => ObjectSchema<unknown>,
}

export type ValidationSchemas = {
  bodySchema: (params: { method: HTTPBodyMethod, type: string }) => ObjectSchema<unknown>
  querySchema: (params: { list: boolean, type: string }) => ObjectSchema<unknown>
}
