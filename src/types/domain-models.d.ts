/**
 * @file domain model type definitions
 */

import type { PageMetadata } from './pagination'

export type DomainModelComposite = {
  meta?: { paging: PageMetadata }
  data: ExampleDomainModel[] // | SomeOtherDomainModel[] // | ...
  solo: boolean
}

// Example Domain Model
export type ExampleDomainModel = {
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