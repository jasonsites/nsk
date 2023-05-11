/**
 * @file domain.d.ts
 */

export interface DomainModule {
  context: (correlation: Correlation) => Domain
}

interface Domain {
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
