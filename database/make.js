/**
* @file database/make.js
* @description creates a new migration file
* @argument name - the name of the migration
*/

const fs = require('fs')

const [,,identifier] = process.argv
if (!identifier) {
  console.error('Please provide a migration name.')
  process.exit(1)
}

const prefix = new Date().toISOString().replace(/[-:T]|\.\d{3}Z?/g, '')
const name = `${prefix}_${identifier}.ts`
const path = `./src/postgres/migrations/${name}`

fs.writeFile(path, content(), function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Migration file '${name}' created successfully.`)
})

function content() {
  return `import { sql } from 'kysely'

import type { PostgresClientType } from '../types'

export async function up(client: PostgresClientType): Promise<void> {
  const raw = \`\`
  await sql.raw(raw).execute(client)
}

export async function down(client: PostgresClientType): Promise<void> {
  const raw = \`\`
  await sql.raw(raw).execute(client)
}
`
}
