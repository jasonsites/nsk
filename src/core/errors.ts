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
    details: Array<Record<string, unknown>>

    constructor(message: string | undefined) {
      super(message)
      Object.setPrototypeOf(this, ConflictError.prototype)
      this.details = []
      this.name = ErrorType.Conflict
    }
  }

  class ForbiddenError extends Error {
    details: Array<Record<string, unknown>>

    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, ForbiddenError.prototype)
      this.details = []
      this.name = ErrorType.Forbidden
      this.details = []
    }
  }

  class InternalServerError extends Error {
    details: Array<Record<string, unknown>>

    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, InternalServerError.prototype)
      this.details = []
      this.name = ErrorType.InternalServer
    }
  }

  class NotFoundError extends Error {
    details: Array<Record<string, unknown>>

    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, NotFoundError.prototype)
      this.details = []
      this.name = ErrorType.NotFound
    }
  }

  class UnauthorizedError extends Error {
    details: Array<Record<string, unknown>>

    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, UnauthorizedError.prototype)
      this.details = []
      this.name = ErrorType.Unauthorized
    }
  }

  class ValidationError extends Error {
    details: Array<Record<string, unknown>>

    constructor(message: string) {
      super(message)
      Object.setPrototypeOf(this, ValidationError.prototype)
      this.details = []
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
