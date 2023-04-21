/**
* @file postgres/index.ts
* @overview postgres client
*/

import config from 'config'
import knexlib, { Knex } from 'knex'

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
  const { client, connection, pool, version } = conf

  const options = {
    client,
    connection: {
      ...connection,
      port: parseInt(connection.port, 10),
    },
    pool: {
      max: parseInt(pool.max, 10),
      min: parseInt(pool.min, 10),
    },
    version,
  }

  const knex: Knex = knexlib(options)

  return { ...errors, knex }
}

export const inject = {
  name: 'postgres',
  require: {
    errors: 'postgres/errors',
  },
}
