/**
 * @file repository type definitions
 */

import type { DomainModelComposite } from './domain-models'

export interface Repository {
  create: (params: { data: unknown }) => Promise<DomainModelComposite | void>
  destroy: (params: { id: string }) => Promise<void>
  detail: (params: { id: string }) => Promise<DomainModelComposite | void>
  list: (params: {
    filters: unknown
    page: unknown
    sort: unknown
  }) => Promise<DomainModelComposite | void>
  update: (params: { data: unknown, id: string }) => Promise<DomainModelComposite | void>
}

export interface RepositoryModule {
  context: (correlation: Correlation) => Repository
}

export type RepositoryConstructor = {
  ({ log }: { log: ScopedLogger }): Repository
}
