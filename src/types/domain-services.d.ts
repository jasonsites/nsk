/**
 * @file domain/businsess logic module/service type definitions
 */

import type { Correlation } from './core'
import type { DomainModel } from './domain-models'

export interface DomainModule {
  getService: (type: string) => DomainServiceWithContext
}

export interface DomainServiceWithContext {
  context: (correlation: Correlation) => DomainService
}

export interface DomainService {
  create: (params: CreateParams) => Promise<DomainModel | void>
  destroy: (params: DestroyParams) => Promise<void>
  detail: (params: DetailParams) => Promise<DomainModel | void>
  list: (params: ListParams) => Promise<DomainModel | void>
  update: (params: UpdateParams) => Promise<DomainModel | void>
}

type CreateParams = {
  data: unknown
  type: string
}

type DestroyParams = {
  id: string
  type: string
}

type DetailParams = {
  id: string
  type: string
}

type ListParams = {
  filters: unknown
  page: unknown
  sort: unknown
  type: string
}

type UpdateParams = {
  data: unknown
  id: string
  type: string
}
