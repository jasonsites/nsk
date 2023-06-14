/**
 * @file core type definitions
 */

// correlation
export type Correlation = {
  headers: Record<string, string>
  req_id: string
}

export type CorrelationWithType = {
  correlation: Correlation
  type: string
}

// core types
export type CoreTypes = DomainModelTypes & ErrorTypes

type DomainModelTypes = { model: Record<string, string> }

// error types
export type ErrorTypes = {
  ConflictError: CustomError
  ErrorType: Record<string, string>
  ForbiddenError: CustomError
  InternalServerError: CustomError
  NotFoundError: CustomError
  UnauthorizedError: CustomError
  ValidationError: CustomError
}

type CustomError = new(message: string) => Error

type ErrorMessages = {
  default: string
  relatedEntityMissing: string
  uniqueConstraintViolation: string
}
