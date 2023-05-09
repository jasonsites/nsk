/**
 * @file repository type definitions
 */

import type { RepoResult } from '../repo'

export interface Repository {
  create: (params: { data: unknown, type: string }) => Promise<RepoResult>
  destroy: (params: { id: string, type: string }) => Promise<void>
  detail: (params: { id: string, type: string }) => Promise<RepoResult>
  list: (params: {
    filters: unknown
    page: unknown
    sort: unknown
    type: string
  }) => Promise<RepoResult>
  update: (params: {
    data: unknown
    id: string
    type: string
  }) => Promise<RepoResult>
}

export interface RepositoryModule {
  context: (correlation: Correlation) => Repository
}
