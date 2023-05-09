/**
 * @file core type definitions
 */

export type Correlation = {
  headers: Record<string, string>
  req_id: string
}

interface CustomError extends Error {
  type: string
}

type ErrorMessages = {
  default: string
  relatedEntityMissing: string
  uniqueConstraintViolation: string
}

export type ErrorTypes = {
  ConflictError: typeof CustomError
  ErrorType: Record<string, string>
  ForbiddenError: typeof CustomError
  InternalServerError: typeof CustomError
  NotFoundError: typeof CustomError
  UnauthorizedError: typeof CustomError
  ValidationError: typeof CustomError
}

type ResourceTypes = { Resource: Record<string, string> }

export type CoreTypes = ErrorTypes & ResourceTypes