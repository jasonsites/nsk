
export type HTTPBodyMethod = 'POST' | 'PUT'

// Body schema types
type DataSchema = {
  type: joi.StringSchema<string>,
  id?: joi.StringSchema<string>,
  properties: joi.ObjectSchema<unknown>
}

export type BodySchemaBuilder = (params: {
  core: CoreTypes,
  method: HTTPBodyMethod,
}) => DataSchema

export type BodySchemaGetter = (params: {
  method: HTTPBodyMethod,
}) => joi.ObjectSchema<unknown>

export type BodyHandler = {
  createSchemaGetter: (params: {
    builder: BodySchemaBuilder,
    core: CoreTypes,
  }) => BodySchemaGetter,
}

export type QueryHandler = {
  querySchema: (params: { method: string, type: string }) => joi.ObjectSchema<unknown>,
}
