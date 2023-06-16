/**
 * @file validation schemas types
 */

import type { ObjectSchema, StringSchema } from 'joi'
import type { CoreTypes } from '../../types/core'
import type { Correlation } from '../../types/correlation'

export type BodySchemaBuilder = (params: { core: CoreTypes, method: HTTPBodyMethod }) => DataSchema

export type BodySchemaGetter = (params: { method: HTTPBodyMethod }) => ObjectSchema<unknown>

export type BodyHandler = {
  createSchemaGetter: (params: { builder: BodySchemaBuilder, core: CoreTypes }) => BodySchemaGetter,
}

export type DataSchema = {
  type: StringSchema<string>,
  id?: StringSchema<string>,
  properties: ObjectSchema<unknown>
}

type ErrorBuilder = {
  details: {
    status: number
    source: { pointer: string }
    title: string
    detail: string
  }[]
  messages: string[]
}

export type HTTPBodyMethod = 'POST' | 'PUT'

export type QueryHandler = {
  querySchema: (params: { method: string, type: string }) => ObjectSchema<unknown>,
}

export type ValidateBodyParams = {
  body: object
  id?: string
  method: HTTPBodyMethod
  type: string
}

export type ValidateQueryParams = {
  list: boolean
  query: string
  type: string
}

export type ValidationSchemas = {
  bodySchema: (params: { method: HTTPBodyMethod, type: string }) => ObjectSchema<unknown>
  querySchema: (params: { list: boolean, type: string }) => ObjectSchema<unknown>
}

interface Validator {
  validateBody: (params: ValidateBodyParams) => void;
  validateQuery: (params: ValidateQueryParams) => void;
}

type ValidationModule = {
  context: (correlation: Correlation) => Validator
}
