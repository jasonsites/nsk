/**
* @file postgres module
*/

import { Kysely } from 'kysely'
import { PostgresClient, PostgresErrors } from './types'

interface Dependencies {
  client: Kysely<any>
  errors: PostgresErrors
}

export default function postgres(deps: Dependencies): PostgresClient {
  const { client, errors } = deps

  return { client, ...errors }
}

export const inject = {
  name: 'postgres',
  require: {
    client: 'postgres/client',
    errors: 'postgres/errors',
  },
}
