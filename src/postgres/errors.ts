/**
* @file postgres/errors.ts
* @overview postgres errors
*/

import config from 'config'

import type { CoreTypes } from '../types/globals'

// knex error object shim
export type DBError = {
  code?: string
}

interface Dependencies {
  core: CoreTypes
}

export default function errors({ core }: Dependencies) {
  const { ConflictError, ValidationError } = core

  const {
    default: defaultError,
    relatedEntityMissing,
    uniqueConstraintViolation,
  }: Record<string, string> = config.get('api.messages.error')

  function throwOnDbError({ error }: { error: DBError }) {
    switch (error.code) {
      case '23503': throw new ValidationError(relatedEntityMissing) // foreign_key_violation
      case '23505': throw new ConflictError(uniqueConstraintViolation) // unique_violation
      default: throw new Error(defaultError)
    }
  }

  return { throwOnDbError }
}

export const inject = {
  require: {
    core: 'core',
  },
}
