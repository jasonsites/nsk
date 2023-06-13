/**
 * @file repository model type definitions
 */

import type { ExampleEntity } from '../../types/database'
import type { DomainModelComposite } from '../../types/domain-models'

export type MarshalParams = {
  data: EntityModel[]
  meta?: { paging: PageMetadata }
  solo?: boolean
}

export interface EntityModelMarshaller {
  marshal: (params: MarshalParams) => DomainModelComposite
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
  marshalPageData: (params: PagingDataParams) => any
  throwOnNotFound: (params: { id: string; data: any; }) => void
}

export type RepositoryUpsertUtilities = {
  // TODO: now missing `type` here
  compose: (params: { data?: any; method?: string; type?: string; }) => any
}
