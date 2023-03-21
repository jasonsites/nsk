/**
 * @file core/errors.ts
 * @overview application errors
 */

export default function errors() {
  const ErrorType = {
    Forbidden: 'ForbiddenError',
    InternalServer: 'InternalServerError',
    NotFound: 'NotFoundError',
    Unauthorized: 'UnauthorizedError',
    Validation: 'ValidationError',
  }

  class ForbiddenError extends Error {
    type: string

    constructor(message) {
      super(message)
      this.type = ErrorType.Forbidden
    }
  }

  class InternalServerError extends Error {
    type: string

    constructor(message) {
      super(message)
      this.type = ErrorType.InternalServer
    }
  }

  class NotFoundError extends Error {
    type: string

    constructor(message) {
      super(message)
      this.type = ErrorType.NotFound
    }
  }

  class UnauthorizedError extends Error {
    type: string

    constructor(message) {
      super(message)
      this.type = ErrorType.Unauthorized
    }
  }

  class ValidationError extends Error {
    type: string

    constructor(message) {
      super(message)
      this.type = ErrorType.Validation
    }
  }

  return {
    ErrorType,
    ForbiddenError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
    ValidationError,
  }
}

export const inject = {}
