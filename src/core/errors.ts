/**
 * @file custom application errors
 */

import type { ErrorTypes } from '../types/core'

export default function errors(): ErrorTypes {
  const ErrorType: Record<string, string> = {
    Conflict: 'ConflictError',
    Forbidden: 'ForbiddenError',
    InternalServer: 'InternalServerError',
    NotFound: 'NotFoundError',
    Unauthorized: 'UnauthorizedError',
    Validation: 'ValidationError',
  }

  class ConflictError extends Error {
    constructor(message: string | undefined) {
      super(message)
      Object.setPrototypeOf(this, ConflictError.prototype)
      this.name = ErrorType.Conflict
    }
  }

  class ForbiddenError extends Error {
    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, ForbiddenError.prototype)
      this.name = ErrorType.Forbidden
    }
  }

  class InternalServerError extends Error {
    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, InternalServerError.prototype)
      this.name = ErrorType.InternalServer
    }
  }

  class NotFoundError extends Error {
    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, NotFoundError.prototype)
      this.name = ErrorType.NotFound
    }
  }

  class UnauthorizedError extends Error {
    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, UnauthorizedError.prototype)
      this.name = ErrorType.Unauthorized
    }
  }

  class ValidationError extends Error {
    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, ValidationError.prototype)
      this.name = ErrorType.Validation
    }
  }

  return {
    ConflictError,
    ErrorType,
    ForbiddenError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
    ValidationError,
  }
}

export const inject = {}
