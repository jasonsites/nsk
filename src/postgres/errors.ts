/**
* @file postgres errors
*/

import config from 'config'

import type { CoreTypes } from '../types/core'
import type { ThrowOnDBErrorParams } from '../types/postgres'

interface Dependencies {
  core: CoreTypes
}

export default function postgresErrors(deps: Dependencies) {
  const { core } = deps
  const { ConflictError, ValidationError } = core

  const {
    default: defaultError,
    relatedEntityMissing,
    uniqueConstraintViolation,
  }: Record<string, string> = config.get('api.messages.error')

  // TODO: outdated (knex) error codes
  function throwOnDbError(params: ThrowOnDBErrorParams) {
    const { error } = params
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
