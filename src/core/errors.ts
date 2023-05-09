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
    type: string

    constructor(message?: string) {
      super(message)
      Object.setPrototypeOf(this, ConflictError.prototype)
      this.type = ErrorType.Conflict
    }
  }

  class ForbiddenError extends Error {
    type: string

    constructor(message?: string) {
      super(message)
      Object.setPrototypeOf(this, ForbiddenError.prototype)
      this.type = ErrorType.Forbidden
    }
  }

  class InternalServerError extends Error {
    type: string

    constructor(message?: string) {
      super(message)
      Object.setPrototypeOf(this, InternalServerError.prototype)
      this.type = ErrorType.InternalServer
    }
  }

  class NotFoundError extends Error {
    type: string

    constructor(message?: string) {
      super(message)
      Object.setPrototypeOf(this, NotFoundError.prototype)
      this.type = ErrorType.NotFound
    }
  }

  class UnauthorizedError extends Error {
    type: string

    constructor(message?: string) {
      super(message)
      Object.setPrototypeOf(this, UnauthorizedError.prototype)
      this.type = ErrorType.Unauthorized
    }
  }

  class ValidationError extends Error {
    type: string

    constructor(message?: string) {
      super(message)
      Object.setPrototypeOf(this, ValidationError.prototype)
      this.type = ErrorType.Validation
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
