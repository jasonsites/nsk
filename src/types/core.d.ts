/**
 * @file core type definitions
 */

export type CoreTypes = DomainModelTypes & ErrorTypes

// TODO: remove in favor of including types declarations on the models
type DomainModelTypes = { model: Record<string, string> }

export type ErrorTypes = {
  ConflictError: CustomErrorConstructor
  ErrorType: Record<string, string>
  ForbiddenError: CustomErrorConstructor
  InternalServerError: CustomErrorConstructor
  NotFoundError: CustomErrorConstructor
  UnauthorizedError: CustomErrorConstructor
  ValidationError: CustomErrorConstructor
}

type CustomError = Error & { details: Array<Record<string, unknown>> }

type CustomErrorConstructor = new (message: string) => CustomError

// Record<string, string>
type ErrorMessages = {
  default: string
  relatedEntityMissing: string
  uniqueConstraintViolation: string
}
