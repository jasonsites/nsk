/**
 * @file repo/entities/db-entity.ts
 * @overview exmaple db entity
 */

export default function entity() {
  const table = 'db_table_name'

  const Field = {
    Id: `${table}.id`,
    Name: `${table}.name`,
  }

  const fields = Object.values(Field)

  return { Field, fields, table }
}

export const inject = {}
