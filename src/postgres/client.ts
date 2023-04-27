/**
* @file postgres/index.ts
* @overview postgres client
*/

import config from 'config'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import type { Database } from '../types/database'

export default function postgresClient() {
  type PostgresClientOptions = {
    client: string
    connection: { host: string; port: string; user: string; password: string; database: string }
    pool: { max: string; min: string }
    version: string
  }

  const conf: PostgresClientOptions = config.get('postgres.options')
  const { connection, pool } = conf

  const client = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: connection.database,
        host: connection.host,
        max: parseInt(pool.max, 10),
        min: parseInt(pool.min, 10),
        password: connection.password,
        port: parseInt(connection.port, 10),
        user: connection.user,
      }),
    }),
  })

  return client
}

export const inject = {}
