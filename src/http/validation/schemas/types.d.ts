
import type { ObjectSchema, StringSchema } from 'joi'
import type { CoreTypes } from '../../../types/globals'

export type HTTPBodyMethod = 'POST' | 'PUT'

// Body schema types
type DataSchema = {
  type: StringSchema<string>,
  id?: StringSchema<string>,
  properties: ObjectSchema<unknown>
}

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

export type QueryHandler = {
  querySchema: (params: { method: string, type: string }) => ObjectSchema<unknown>,
}
