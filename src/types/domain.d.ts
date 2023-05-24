/**
 * @file domain/businsess logic type definitions
 */

export interface DomainModule {
  context: (correlation: Correlation) => DomainService
}

interface DomainService {
  create: (params: CreateParams) => Promise<unknown>
  destroy: (params: DestroyParams) => Promise<unknown>
  detail: (params: DetailParams) => Promise<unknown>
  list: (params: ListParams) => Promise<unknown>
  update: (params: UpdateParams) => Promise<unknown>
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

// domain models -------------------------------------------------
export type ExampleDomainModel = {
  id: string
  title: string
  description: string
  status: string
  enabled: boolean
  created_on: string
  created_by: string
  modified_on: string
  modified_by: string
}
