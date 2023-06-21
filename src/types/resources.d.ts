/**
 * @file resource type definitions
 */

import { ExampleDomainObject } from './domain/models'
import type { PageMetadata } from './pagination'

export type Resource = {
  meta?: ResourceMetadata
  data: ResourceData | ResourceData[]
}

export type ResourceMetadata = {
  paging?: PageMetadata
}

export type ResourceData = ExampleResourceData // | SomeOtherResourceData | ...

export type ResourceAuditProperties = {
  created_on: string
  created_by: number
  modified_on: string | null
  modified_by: number | null
}

export type ExampleResourceProperties = {
  title: string
  description: string | null
  status: number | null
  enabled: boolean
}

export type ExampleResourceData = {
  type: ExampleDomainObject['type']
  id: string
  properties: ExampleResourceProperties & ResourceAuditProperties
}
