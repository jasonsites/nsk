/**
 * @file domain model type definitions
 */

import type { PageMetadata } from '../pagination'

export type DomainModel = {
  data: ExampleDomainObject[] // | SomeOtherDomainModel[] // | ...
  meta?: DomainModelMetadata
  solo: boolean
  type: string
}

export type DomainModelMetadata = {
  paging: PageMetadata
}

// domain (business) objects
export type DomainObject = ExampleDomainObject // | SomeOtherDomainObject | ...

export type ExampleDomainObject = {
  attributes: {
    created_by: number
    created_on: string
    description: string | null
    enabled: boolean
    id: string
    modified_by: number | null
    modified_on: string | null
    status: number | null
    title: string
  }
  meta?: unknown
  related?: unknown[] // TODO: currently no related (or even other) types are defined
  type: 'example'
}
