/**
 * @file domain model type definitions
 */

import type { PageMetadata } from './pagination'

export type DomainModel = {
  data: ExampleDomainObject[] // | SomeOtherDomainModel[] // | ...
  meta?: DomainModelMetadata
  solo: boolean
}

export type DomainModelMetadata = {
  paging: PageMetadata
}

// Example Domain Model
export type ExampleDomainObject = {
  attributes: {
    id: string
    title: string
    description: string | null
    status: number | null
    enabled: boolean
    created_on: string
    created_by: number
    modified_on: string | null
    modified_by: number | null
  }
  meta?: any
  related?: any[]
}

export type DomainObject = ExampleDomainObject // | SomeOtherDomainObject | ...
