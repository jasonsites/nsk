/**
 * @file http type definitions
 */

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

export type HttpServer = Koa & { initialize: () => Promise<void> }

export type Middleware = (ctx: Context, next: Next) => Promise<void>
