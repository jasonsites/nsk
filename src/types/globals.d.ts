
import Logger, { LogLevel } from 'bunyan'

import type { RepoResult } from '../repo/types'

// API configuration -----------------------------------------------
type ErrorMessages = {
  default: string,
  relatedEntityMissing: string,
  uniqueConstraintViolation: string
}

type PagingDefaults = {
  defaultLimit: number,
  defaultOffset: number
}

type SortingDefaults = {
  defaultOrder: 'asc' | 'desc',
  defaultProp: string
}

export type ApiConfiguration = {
  baseURL: string,
  messages: { error: ErrorMessages },
  namespace: string,
  paging: PagingDefaults,
  port: number,
  sorting: SortingDefaults,
  tracing: { headers: string[] },
  version: string
}

// Domain ----------------------------------------------------------
interface CustomError extends Error {
  type: string
}

export type ErrorTypes = {
  ConflictError: typeof CustomError,
  ErrorType: Record<string, string>,
  ForbiddenError: typeof CustomError,
  InternalServerError: typeof CustomError,
  NotFoundError: typeof CustomError,
  UnauthorizedError: typeof CustomError,
  ValidationError: typeof CustomError,
}

export type ResourceTypes = { Resource: Record<string, string> }
export type CoreTypes = ErrorTypes & ResourceTypes

// Logger ----------------------------------------------------------
type CustomLoggerFields = {
  enabled?: boolean
}

export type ScopedLogger = Logger & CustomLoggerFields

export type LoggerConfiguration = {
  enabled: boolean
  label?: string
  level: LogLevel | undefined
}

// Context ---------------------------------------------------------
export type Correlation = {
  headers: Record<string, string>
  req_id: string
}

// Pagination ------------------------------------------------------
export type PagingData = {
  limit: number
  offset: number
  total: number
}

// HTTP Server -----------------------------------------------------
export type HttpServer = Koa & { initialize: () => Promise<void> }
export type Middleware = (ctx: Context, next: Next) => Promise<void>

// Repository ------------------------------------------------------
export interface Repository {
  create: (params: { data: unknown, type: string }) => Promise<RepoResult>
  destroy: (params: { id: string, type: string }) => Promise<void>
  detail: (params: { id: string, type: string }) => Promise<RepoResult>
  list: (params: {
    filters: unknown,
    page: unknown,
    sort: unknown,
    type: string,
  }) => Promise<RepoResult>
  update: (params: { data: unknown, id: string, type: string }) => Promise<RepoResult>
}

// Services --------------------------------------------------------
export interface ExternalService {
  context: (correlation: Correlation) => { get: () => Promise<unknown> }
}

export type ExampleServiceConfiguration = {
  baseURL: string,
  timeout: number,
}
