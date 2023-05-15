/**
 * @file database schema
 * @see https://kysely-org.github.io/kysely/
 */

export interface ResourceEntity {
  id: Generated<string> // uuid
  title: string
  description: string | null
  deleted: boolean
  enabled: boolean
  status: number | null
  created_on: string // timestamptz
  created_by: string
  modified_on: string | null // timestamptz
  modified_by: number | null
}

// keys of this interface are table names
export interface Database {
  resource: ResourceEntity
}
