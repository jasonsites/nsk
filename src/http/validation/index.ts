/**
 * @file schema validation
 */

import config from 'config'
import joi from 'joi'

import type Logger from 'bunyan'
import type { CoreTypes } from '../../types/core'
import type { Correlation } from '../../types/correlation'
import type { LoggerConfiguration, ScopedLogger } from '../../types/logger'
import type { ErrorBuilder, HTTPBodyMethod, ValidationModule, ValidationSchemas } from './types'

interface Dependencies {
  core: CoreTypes
  logger: Logger
  schemas: ValidationSchemas
}

export default function validation(deps: Dependencies): ValidationModule {
  const { core, logger, schemas } = deps
  const { ValidationError } = core

  const { enabled, label, level }: LoggerConfiguration = config.get('logger.validation')

  return {
    context: (correlation: Correlation) => {
      const { req_id } = correlation

      const log: ScopedLogger = logger.child({ module: label, req_id, level })
      log.enabled = enabled

      function composeValidationError(params: ErrorBuilder) {
        const { details, messages } = params

        const error = new ValidationError(messages.join(', '))
        error.details = details
        return error
      }

      function formatBasicValidationErrors(params: { error: joi.ValidationError }) {
        const { error } = params

        if (!error || !error.isJoi || !Array.isArray(error.details)) {
          throw new Error('unknown validation error')
        }
        return error.details.reduce((memo: ErrorBuilder, detail: joi.ValidationErrorItem) => {
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

      function throwOnInvalid(params: { errors: ErrorBuilder }) {
        const { errors } = params

        if (errors?.details?.length) {
          const err = composeValidationError(errors)
          if (log.enabled) log.error(`${err.message}`)
          throw err
        }
      }

      function validateBody(params: { body: object; method: HTTPBodyMethod; type: string; }): void {
        const { body, method, type } = params

        const schema = schemas.bodySchema({ method, type })
        const options = { abortEarly: false }
        const { error } = schema.validate(body, options)

        const errors: ErrorBuilder = error
          ? formatBasicValidationErrors({ error })
          : { details: [], messages: [] }
        throwOnInvalid({ errors })
      }

      function validateQuery(params: { list: boolean; query: string; type: string; }): void {
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
