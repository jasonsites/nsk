/**
 * @file validation/index.ts
 * @overview schema validation
 */

import config from 'config'
import joi from 'joi'

import type Logger from 'bunyan'
import type { CoreTypes, Correlation, LoggerConfiguration, ScopedLogger } from '../../types/globals'
import { HTTPBodyMethod } from './schemas/types'

type Dependencies = {
  core: CoreTypes,
  logger: Logger,
  schemas: {
    bodySchema: (params: { method: HTTPBodyMethod, type: string }) => joi.ObjectSchema<unknown>
    querySchema: (params: { list: boolean, type: string }) => joi.ObjectSchema<unknown>
  },
}

export default function validation(deps: Dependencies) {
  const { core, logger, schemas } = deps
  const { ValidationError } = core

  const { enabled, label, level }: LoggerConfiguration = config.get('logger.validation')

  return {
    context: (correlation: Correlation) => {
      const { req_id } = correlation
      const log: ScopedLogger = logger.child({ module: label, req_id, level })
      log.enabled = enabled

      function composeValidationError(params: TempErrorBuilder) {
        const { details, messages } = params

        const error = new ValidationError(messages.join(', '))
        error.details = details
        return error
      }

      type ErrorData = {
        status: number,
        source: { pointer: string },
        title: string,
        detail: string,
      }

      type TempErrorBuilder = {
        details: ErrorData[],
        messages: string[],
      }

      function formatBasicValidationErrors({ error }: { error: joi.ValidationError }) {
        if (!error || !error.isJoi || !Array.isArray(error.details)) {
          throw new Error('unknown validation error')
        }
        return error.details.reduce((memo: TempErrorBuilder, detail: joi.ValidationErrorItem) => {
          const { message, path } = detail
          memo.messages.push(message)
          const data = {
            status: 400,
            source: { pointer: path.map((p) => `/${p}`).join('') },
            title: error.name,
            detail: message,
          }
          memo.details.push(data)
          return memo
        }, { details: [], messages: [] })
      }

      function throwOnInvalid({ errors }: { errors: TempErrorBuilder }) {
        if (errors.details.length) {
          const err = composeValidationError(errors)
          if (log.enabled) log.error(`${err.message}`)
          throw err
        }
      }

      function validateBody(params: { body: object, method: HTTPBodyMethod, type: string}): void {
        const { body, method, type } = params

        const schema = schemas.bodySchema({ method, type })
        const options = { abortEarly: false }
        const { error } = schema.validate(body, options)

        const errors: TempErrorBuilder = error
          ? formatBasicValidationErrors({ error })
          : { details: [], messages: [] }
        throwOnInvalid({ errors })
      }

      function validateQuery(params: { list: boolean, query: string, type: string }): void {
        const { list, query, type } = params

        const schema = schemas.querySchema({ list, type })
        const options = { abortEarly: false }
        const { error } = schema.validate(query, options)

        const errors = error
          ? formatBasicValidationErrors({ error })
          : { details: [], messages: [] }
        throwOnInvalid({ errors })
      }

      return {
        composeValidationError,
        formatBasicValidationErrors,
        validateBody,
        validateQuery,
      }
    },
  }
}

export const inject = {
  name: 'validation',
  require: {
    core: 'core',
    logger: 'logger',
    schemas: 'http/validation/schemas/index',
  },
}
