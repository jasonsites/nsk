/**
 * @file http type definitions
 */

import type Koa from 'koa'
import type { Context, Middleware } from 'koa'
import type { ErrorMessages } from '../types/core'
import type { PagingDefaults, SortingDefaults } from './controllers/types'

export type ApiConfiguration = {
  baseURL: string
  messages: { error: ErrorMessages }
  namespace: string
  paging: PagingDefaults
  port: number
  sorting: SortingDefaults
  tracing: { headers: string[] }
  version: string
}

export type Controller = {
  create: (ctx: Context) => Promise<void>
  destroy: (ctx: Context) => Promise<void>
  detail: (ctx: Context) => Promise<void>
  list: (ctx: Context) => Promise<void>
  update: (ctx: Context) => Promise<void>
}

type HTTPResource = {
  data: {
    type: string
    id?: string
    properties: Record<string, unknown>
  }
}

export type HttpRouter = {
  configureMiddleware: (app: HttpServer) => void,
  registerRoutes: (app: HttpServer) => void,
}

export type HttpServer = Koa & { initialize: () => Promise<void> }

export type MiddlewareLocalType = { localType: (params: { type: string }) => Middleware }
