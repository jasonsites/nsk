/**
* @file postgres/index.ts
* @overview postgres client
*/

import config from 'config'
import knexlib from 'knex'

export default function postgres({ errors }) {
  const options = config.get('postgres.options')
  const knex = knexlib(options)

  return { ...errors, knex }
}

export const inject = {
  name: 'postgres',
  require: {
    errors: 'postgres/errors',
  },
}
