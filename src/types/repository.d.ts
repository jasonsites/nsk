/**
 * @file repository type definitions
 */

import type { Correlation } from './core'
import type { DomainModel } from './domain-models'
import type { ScopedLogger } from './logger'

export interface Repository {
  create: (params: { data: unknown }) => Promise<DomainModel | void>
  destroy: (params: { id: string }) => Promise<void>
  detail: (params: { id: string }) => Promise<DomainModel | void>
  list: (params: {
    filters: unknown
    page: unknown
    sort: unknown
  }) => Promise<DomainModel | void>
  update: (params: { data: unknown, id: string }) => Promise<DomainModel | void>
}

export interface RepositoryModule {
  context: (correlation: Correlation) => Repository
}

export type RepositoryConstructor = {
  ({ log }: { log: ScopedLogger }): Repository
}
