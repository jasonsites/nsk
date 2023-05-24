/**
* @file resource entity model
*/

import Bluebird from 'bluebird'

import type { CoreTypes } from '../../types/core'
import type { ScopedLogger } from '../../types/logger'
import type { PostgresClient } from '../../postgres/types'
import type { EntityData } from '../entities/types'
import type { EntityModel, EntityModelUtilities, RepoResult } from './types'

interface Dependencies {
  core: CoreTypes
  entities: Record<string, EntityData>
  postgres: PostgresClient
  utils: EntityModelUtilities
}

export default function model(deps: Dependencies) {
  const { core, entities, postgres, utils } = deps
  const { client, throwOnDbError } = postgres

  return function Example({ log }: { log: ScopedLogger }): EntityModel {
    const type = core.model.example

    async function create(params: { data: any }): Promise<RepoResult> {
      const { data } = params
      try {
        const insert = utils.composeUpsert({ data, method: 'create', type })
        const record = await client
          .insertInto(entities.example.table)
          .values(insert)
          .returning(entities.example.fields)
          .executeTakeFirstOrThrow()
        return { data: [{ type, record }] }
      } catch (error: any) {
        if (log.enabled) log.error(error)
        return throwOnDbError({ error })
      }
    }

    async function destroy(params: { id: string }): Promise<void> {
      const { id } = params
      try {
        const [record] = await client.selectFrom(entities.example.table)
          .select(entities.example.fields)
          .where(entities.example.field.Deleted, '=', false)
          .where(entities.example.field.Id, '=', id)
          .execute()
        utils.throwOnNotFound({ id, data: record })

        const destroyUpsert = utils.composeUpsert({ method: 'destroy' })
        await client
          .updateTable(entities.example.table)
          .set(destroyUpsert)
          .where(entities.example.field.Id, '=', id)
          .returning(entities.example.field.Id)
          .executeTakeFirstOrThrow()
      } catch (error: any) {
        if (log.enabled) log.error(error)
        return throwOnDbError({ error })
      }

      return undefined
    }

    async function detail(params: { id: string }): Promise<RepoResult> {
      const { id } = params
      try {
        const [record] = await client.selectFrom(entities.example.table)
          .select(entities.example.fields)
          .where(entities.example.field.Deleted, '=', false)
          .where(entities.example.field.Id, '=', id)
          .execute()

        utils.throwOnNotFound({ id, data: record })

        return { data: [{ type, record }] }
      } catch (error: any) {
        if (log.enabled) log.error(error)
        return throwOnDbError({ error })
      }
    }

    // TODO: params type
    async function list(params: { filters: any, page: any, sort: any }): Promise<RepoResult> {
      const { filters, page, sort } = params
      const { limit, offset } = page
      const { order, prop } = sort

      try {
        const query = client.selectFrom(entities.example.table)
          .select(entities.example.fields)
          .where(entities.example.field.Deleted, '=', false)
          .limit(limit)
          .offset(offset)
          .orderBy(prop, order)

        const totalQuery = client.selectFrom(entities.example.table)
          .select(client.fn.countAll<number>().as('count'))
          .where(entities.example.field.Deleted, '=', false)

        // TODO
        Object.entries(filters).forEach(([k, v]: [k: any, v: any]) => {
          query.where(k, '=', v)
          totalQuery.where(k, '=', v)
        })

        const resourceRecords = await query.execute()
        const [{ count }] = await totalQuery.execute()

        const data = await Bluebird.map(resourceRecords, async (record) => ({ type, record }))
        const meta = { paging: utils.composePagingData({ count, limit, offset }) }

        return { data, meta }
      } catch (error: any) {
        if (log.enabled) log.error(error)
        return throwOnDbError({ error })
      }
    }

    async function update(params: { data: any, id: string }): Promise<RepoResult> {
      const { data, id } = params

      try {
        const resourceUpdate = utils.composeUpsert({ data, type })
        const record = await client
          .updateTable(entities.example.table)
          .set(resourceUpdate)
          .where(entities.example.field.Id, '=', id)
          .where(entities.example.field.Deleted, '=', false)
          .returning(entities.example.fields)
          .executeTakeFirstOrThrow()

        utils.throwOnNotFound({ id, data: record })

        return { data: [{ type, record }] }
      } catch (error: any) {
        if (log.enabled) log.error(error)
        return throwOnDbError({ error })
      }
    }

    return { create, destroy, detail, list, type, update }
  }
}

export const inject = {
  require: {
    core: 'core',
    entities: 'entities',
    postgres: 'postgres',
    utils: 'repo/models/utils',
  },
}
