/**
* @file postgres/errors.ts
* @overview postgres errors
*/

import config from 'config'

export default function errors({ core }) {
  const { ConflictError, ValidationError } = core

  const {
    default: defaultError,
    relatedEntityMissing,
    uniqueConstraintViolation,
  } = config.get('api.messages.error')

  function throwOnDbError({ error }) {
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
