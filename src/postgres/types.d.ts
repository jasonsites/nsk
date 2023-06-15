/**
 * @file postgres client type definitions
 */

import type { Kysely } from 'kysely'

// TODO: namespace all error methods under PostgresClient.errors
export type PostgresClient = PostgresErrors & {
  client: Kysely<any>
}

export type PostgresClientOptions = {
  client: string
  connection: {
    database: string
    host: string
    password: string
    port: string
    user: string
  }
  pool: {
    max: string
    min: string
  }
  version: string
}

export type PostgresErrors = { throwOnDbError: ThrowOnDBError }

export type ThrowOnDBErrorParams = { error: { code?: string } }

export type ThrowOnDBError = (params: ThrowOnDBErrorParams) => void
