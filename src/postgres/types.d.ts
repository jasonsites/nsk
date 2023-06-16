/**
 * @file postgres client type definitions
 */

/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

import type { Kysely } from 'kysely'
import type { ThrowOnDBError } from '../types/postgres'

// TODO: namespace all error methods under PostgresClient.errors
export type PostgresClient = PostgresErrors & {
  client: PostgresClientType
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

export type PostgresClientType = Kysely<any>

export type PostgresErrors = { throwOnDbError: ThrowOnDBError }
