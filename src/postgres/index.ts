/**
* @file postgres/index.ts
* @overview postgres client
*/

import config from 'config'

import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

import type { Database } from '../types/database'

interface Dependencies {
  errors: { throwOnDbError: (error: { error: { code: string } }) => void }
}

export default function postgres({ errors }: Dependencies) {
  type PostgresClientOptions = {
    client: string
    connection: { host: string; port: string; user: string; password: string; database: string }
    pool: { max: string; min: string }
    version: string
  }

  const conf: PostgresClientOptions = config.get('postgres.options')
  const { connection, pool } = conf

  const db = new Kysely<Database>({
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

  return { db, ...errors }
}

export const inject = {
  name: 'postgres',
  require: {
    errors: 'postgres/errors',
  },
}
