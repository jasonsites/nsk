/**
 * @file repository model type definitions
 */

import type { ExampleEntity } from '../../types/database'
import type { DomainModel } from '../../types/domain/models'
import type { PageMetadata } from '../../types/pagination'
import { ExampleResourceProperties } from '../../types/resources'

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
// Handler Utilities
export type PagingDataParams = {
  count: number
  limit: number
  offset: number
}

export type ThrownOnNotFoundParams = {
  id: string
  data: unknown
  type: string
}

export type RepositoryHandlerUtilities = {
  marshalPageData: (params: PagingDataParams) => PageMetadata
  throwOnNotFound: (params: ThrownOnNotFoundParams) => void
}

// ------------------------------------------------------------------------------
// Upsert Utilities
export type UpsertParams = {
  data: ExampleResourceProperties // | SomeOtherResourceProperties
  type: string
}

export type UpsertData = ExampleResourceProperties // | SomeOtherResourceProperties

export type RepositoryComposerUtilities = {
  create: (params: UpsertParams) => UpsertData
  destroy: () => { deleted: boolean, modified_by: number, modified_on: string }
  update: (params: UpsertParams) => UpsertData
}

export type EnforceUpsertFieldsParams = {
  data: ExampleResourceProperties // | SomeOtherResourceProperties
  type: string
}
