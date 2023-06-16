/**
* @file postgres module
*/

import type { PostgresClient, PostgresClientType, PostgresErrors } from './types'

interface Dependencies {
  client: PostgresClientType
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
