/**
* @file postgres/index.ts
* @overview postgres client
*/

import { Kysely } from 'kysely'

interface Dependencies {
  client: Kysely<any>,
  errors: { throwOnDbError: (error: { error: { code: string } }) => void },
}

export default function postgres(deps: Dependencies) {
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
