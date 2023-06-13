/**
 * @file domain/businsess logic module/service type definitions
 */

export interface DomainModule {
  getService: (type: string) => DomainService
}

export interface DomainService {
  context: (correlation: Correlation) => {
    create: (params: CreateParams) => Promise<DomainModelComposite | void>
    destroy: (params: DestroyParams) => Promise<void>
    detail: (params: DetailParams) => Promise<DomainModelComposite | void>
    list: (params: ListParams) => Promise<DomainModelComposite | void>
    update: (params: UpdateParams) => Promise<DomainModelComposite | void>
  }
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
