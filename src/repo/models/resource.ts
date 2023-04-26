/**
* @file repo/models/resource.ts
* @overview resource entity model
*/

import Bluebird from 'bluebird'

import { Kysely } from 'kysely'
// import { repeat } from 'lodash'
import type { EntityData, Model, RepoResult } from '../types'
import type { DBError } from '../../postgres/errors'
import type { CoreTypes, ScopedLogger } from '../../types/globals'

interface Dependencies {
  core: CoreTypes,
  entities: Record<string, EntityData>,
  postgres: {
    db: Kysely<any>,
    throwOnDbError: ({ error }: { error: DBError }) => void,
  },
  utils: {
    composePagingData: ({ count, limit, offset }: {
      count: number,
      limit: number,
      offset: number,
    }) => any,
    composeUpsert: ({ data, method, type }: { data?: any, method?: string, type?: string }) => any,
    throwOnNotFound: ({ id, data }: { id: string, data: any }) => void,
  },
}

export default function model(deps: Dependencies) {
  const { core, entities, postgres, utils } = deps
  const { Resource } = core
  const { ResourceEntity } = entities
  const { db, throwOnDbError } = postgres

  return function DomainResourceModel({ log }: { log: ScopedLogger }): Model {
    const type = Resource.DomainResource

    async function create({ data }: { data: any }): Promise<RepoResult> {
      try {
        const resourceInsert = utils.composeUpsert({ data, method: 'create', type })
        const record = await db
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

    async function destroy({ id }: { id: string }): Promise<void> {
      try {
        const [record] = await db.selectFrom(ResourceEntity.table)
          .select(ResourceEntity.fields)
          .where(ResourceEntity.Field.Deleted, '=', false)
          .where(ResourceEntity.Field.Id, '=', id)
          .execute()
        utils.throwOnNotFound({ id, data: record })

        const destroyUpsert = utils.composeUpsert({ method: 'destroy' })
        await db
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

    async function detail({ id }: { id: string }): Promise<RepoResult> {
      try {
        const [record] = await db.selectFrom(ResourceEntity.table)
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

    async function list(params: { filters: any, page: any, sort: any }): Promise<RepoResult> {
      const { filters, page, sort } = params
      const { limit, offset } = page
      const { order, prop } = sort

      try {
        const query = db.selectFrom(ResourceEntity.table)
          .select(ResourceEntity.fields)
          .where(ResourceEntity.Field.Deleted, '=', false)
          .limit(limit)
          .offset(offset)
          .orderBy(prop, order)

        const totalQuery = db.selectFrom(ResourceEntity.table)
          .select(db.fn.countAll<number>().as('count'))
          .where(ResourceEntity.Field.Deleted, '=', false)

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
        const record = await db
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
    utils: 'repo/models/utilities',
  },
}
