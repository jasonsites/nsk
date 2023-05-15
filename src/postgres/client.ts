/**
* @file postgres client
*/

import config from 'config'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import type { Database } from '../types/database'
import type { PostgresClientOptions } from './types'

export default function postgresClient(): Kysely<Database> {
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
