/**
 * @file repository type definitions
 */

import type { Correlation } from './correlation'
import type { DomainModel } from './domain/models'
import type { ScopedLogger } from './logger'

export interface Repository {
  create: (params: { data: unknown }) => Promise<DomainModel>
  destroy: (params: { id: string }) => Promise<void>
  detail: (params: { id: string }) => Promise<DomainModel>
  list: (params: {
    filters: unknown
    page: unknown
    sort: unknown
  }) => Promise<DomainModel>
  update: (params: { data: unknown, id: string }) => Promise<DomainModel>
}

export interface RepositoryModule {
  context: (correlation: Correlation) => Repository
}

export type RepositoryConstructor = {
  ({ log }: { log: ScopedLogger }): Repository
}
