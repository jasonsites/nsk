/**
 * @file repository model type definitions
 */

export type EntityModel = {
  ({ log }: { log: ScopedLogger }): Model
}

export type Model = {
  type: string
  create: (params: {data: any }) => Promise<RepoResult>
  destroy: (params: { id: string }) => Promise<void>
  detail: (params: { id: string }) => Promise<RepoResult>
  list: (params: { filters: any; page: any; sort: any; }) => Promise<RepoResult>
  update: (params: { data: any; id: string; }) => Promise<RepoResult>
}

export type ModelUtilities = {
  composePagingData: (params: { count: number; limit: number; offset: number; }) => any
  composeUpsert: (params: { data?: any; method?: string; type?: string; }) => any
  throwOnNotFound: (params: { id: string; data: any; }) => void
}

export type RepoResult = void | {
  data: { type: string; record: any; }[]
  meta?: { paging: any }
}
