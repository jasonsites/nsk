/**
 * @file domain/businsess logic module/service type definitions
 */

import type { Correlation } from '../correlation'
import type { DomainModel } from './models'

export interface DomainModule {
  service: (type: string) => DomainServiceModule
}

export interface DomainServiceModule {
  context: (correlation: Correlation) => DomainService
}

export interface DomainService {
  create: (params: CreateParams) => Promise<DomainModel>
  destroy: (params: DestroyParams) => Promise<void>
  detail: (params: DetailParams) => Promise<DomainModel>
  list: (params: ListParams) => Promise<DomainModel>
  update: (params: UpdateParams) => Promise<DomainModel>
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
