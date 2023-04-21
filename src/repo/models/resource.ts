/**
* @file repo/models/cycle-template.js
* @overview cycle template model
*/

import Bluebird from 'bluebird'
import { Knex } from 'knex'

import type { EntityData, Model, RepoResult } from '../types'
import type { DBError } from '../../postgres/errors'
import type { CoreTypes, ScopedLogger } from '../../types/globals'

interface Dependencies {
  core: CoreTypes,
  entities: Record<string, EntityData>,
  postgres: {
    knex: Knex,
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
  const { knex, throwOnDbError } = postgres

  /**
   * @param {object} params.log   - repo logger
   * @return {object}
   */
  return function DomainResourceModel({ log }: { log: ScopedLogger }): Model {
    const type = Resource.DomainResource

    // create
    async function create({ data }: { data: any }): Promise<RepoResult> {
      return knex.transaction(async (trx) => {
        try {
          const resourceInsert = utils.composeUpsert({ data, method: 'create', type })
          const [record] = await trx(ResourceEntity.table)
            .insert(resourceInsert)
            .returning(ResourceEntity.fields)

          return { data: [{ type, record }] }
        } catch (error: DBError | any) {
          if (log.enabled) log.error(error)
          return throwOnDbError({ error })
        }
      })
    }

    // destroy (delete)
    async function destroy({ id }: { id: string }): Promise<void> {
      const [record] = await knex(ResourceEntity.table)
        .where(ResourceEntity.Field.Deleted, false)
        .where(ResourceEntity.Field.Id, id)
      utils.throwOnNotFound({ id, data: record })

      const destroyUpsert = utils.composeUpsert({ method: 'destroy' })
      await Bluebird.try(() => knex(ResourceEntity.table)
        .where(ResourceEntity.Field.Id, id)
        .update(destroyUpsert))

      return undefined
    }

    // detail
    async function detail({ id }: { id: string }): Promise<RepoResult> {
      const [record] = await knex.from(ResourceEntity.table)
        .select(ResourceEntity.fields)
        .where(ResourceEntity.Field.Deleted, false)
        .where(ResourceEntity.Field.Id, id)

      utils.throwOnNotFound({ id, data: record })

      return { data: [{ type, record }] }
    }

    // list
    async function list(params: { filters: any, page: any, sort: any }): Promise<RepoResult> {
      const { filters, page, sort } = params

      const { limit, offset } = page
      const { order, prop } = sort

      const query = knex.from(ResourceEntity.table)
        .select(ResourceEntity.fields)
        .where(ResourceEntity.Field.Deleted, false)
        .limit(limit)
        .offset(offset)
        .orderBy(prop, order)

      const totalQuery = knex.from(ResourceEntity.table)
        .count(ResourceEntity.Field.Id)
        .where(ResourceEntity.Field.Deleted, false)

      Object.entries(filters).forEach(([k, v]: [k: any, v: any]) => {
        query.where(k, v)
        totalQuery.where(k, v)
      })

      const resourceRecords = await query
      const [{ count }] = await totalQuery

      const data = await Bluebird.map(resourceRecords, async (record) => ({ type, record }))
      const meta = { paging: utils.composePagingData({ count, limit, offset }) }

      return { data, meta }
    }

    // update
    async function update(params: { data: any, id: string }): Promise<RepoResult> {
      const { data, id } = params
      let record
      try {
        const resourceUpdate = utils.composeUpsert({ data, type })
        const [rec] = await knex(ResourceEntity.table)
          .where(ResourceEntity.Field.Id, id)
          .update(resourceUpdate)
          .returning(ResourceEntity.fields)
        record = rec
      } catch (error: DBError | any) {
        if (log.enabled) log.error(error)
        return throwOnDbError({ error })
      }

      utils.throwOnNotFound({ id, data: record })

      return { data: [{ type, record }] }
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
