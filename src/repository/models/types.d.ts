/**
 * @file repository model type definitions
 */

import type { ExampleEntity } from '../../types/database'
import type { DomainModel } from '../../types/domain/models'
import type { PageMetadata } from '../../types/pagination'

export type MarshalParams = {
  data: EntityModel[]
  meta?: { paging: PageMetadata }
  solo?: boolean
}

export interface EntityModelMarshaller {
  marshal: (params: MarshalParams) => DomainModel
}

export type EntityModel = ExampleEntityModel // | SomeOtherEntityModel ...

// NOTE: entity models are composed of 1 or more entities
export type ExampleEntityModel = ExampleEntity
// export type SomeOtherEntityModel = SomeOtherEntity + 2 other `entities` ...

// ------------------------------------------------------------------------------

export type PagingDataParams = {
  count: number
  limit: number
  offset: number
}

export type RepositoryHandlerUtilities = {
  marshalPageData: (params: PagingDataParams) => any // TODO: any
  throwOnNotFound: (params: { id: string; data: any; }) => void // TODO: any
}

export type RepositoryUpsertUtilities = {
  // TODO: now missing `type` here
  compose: (params: { data?: any; method?: string; type?: string; }) => any // TODO: any
}
