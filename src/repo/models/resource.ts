/**
* @file resource entity model
*/

import Bluebird from 'bluebird'

import type { CoreTypes } from '../../types/core'
import type { ScopedLogger } from '../../types/logger'
import type { PostgresClient } from '../../types/postgres'
import type { EntityData } from '../entities/types'
import type { Model, ModelUtilities, RepoResult } from './types'

interface Dependencies {
  core: CoreTypes
  entities: Record<string, EntityData>
  postgres: PostgresClient
  utils: ModelUtilities
}

export default function model(deps: Dependencies) {
  const { core, entities, postgres, utils } = deps
  const { Resource } = core
  const { ResourceEntity } = entities
  const { client, throwOnDbError } = postgres

  return function DomainResourceModel({ log }: { log: ScopedLogger }): Model {
    const type = Resource.DomainResource

    async function create(params: { data: any }): Promise<RepoResult> {
      const { data } = params
      try {
        const resourceInsert = utils.composeUpsert({ data, method: 'create', type })
        const record = await client
          .insertInto(ResourceEntity.table)
          .values(resourceInsert)
          .returning(ResourceEntity.fields)
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
        const [record] = await client.selectFrom(ResourceEntity.table)
          .select(ResourceEntity.fields)
          .where(ResourceEntity.Field.Deleted, '=', false)
          .where(ResourceEntity.Field.Id, '=', id)
          .execute()
        utils.throwOnNotFound({ id, data: record })

        const destroyUpsert = utils.composeUpsert({ method: 'destroy' })
        await client
          .updateTable(ResourceEntity.table)
          .set(destroyUpsert)
          .where(ResourceEntity.Field.Id, '=', id)
          .returning(ResourceEntity.Field.Id)
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
        const [record] = await client.selectFrom(ResourceEntity.table)
          .select(ResourceEntity.fields)
          .where(ResourceEntity.Field.Deleted, '=', false)
          .where(ResourceEntity.Field.Id, '=', id)
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
        const query = client.selectFrom(ResourceEntity.table)
          .select(ResourceEntity.fields)
          .where(ResourceEntity.Field.Deleted, '=', false)
          .limit(limit)
          .offset(offset)
          .orderBy(prop, order)

        const totalQuery = client.selectFrom(ResourceEntity.table)
          .select(client.fn.countAll<number>().as('count'))
          .where(ResourceEntity.Field.Deleted, '=', false)

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
          .updateTable(ResourceEntity.table)
          .set(resourceUpdate)
          .where(ResourceEntity.Field.Id, '=', id)
          .where(ResourceEntity.Field.Deleted, '=', false)
          .returning(ResourceEntity.fields)
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
