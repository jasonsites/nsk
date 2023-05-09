/**
 * @file postgres client type definitions
 */

// TODO: outdated (knex) error object shim - still necessary?
export type DBError = {
  code?: string
}

export type PostgresClient = {
  client: Kysely<any>
  throwOnDbError: (params: ThrowOnDBErrorParams) => void
}

export type ThrowOnDBErrorParams = {
  error: DBError
}
