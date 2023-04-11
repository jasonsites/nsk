/**
* @file postgres/index.ts
* @overview postgres client
*/

import config from 'config'
import knexlib from 'knex'

export default function postgres({ errors }) {
  const { client, connection, pool, version } = config.get('postgres.options')
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
  const knex = knexlib(options)

  return { ...errors, knex }
}

export const inject = {
  name: 'postgres',
  require: {
    errors: 'postgres/errors',
  },
}
