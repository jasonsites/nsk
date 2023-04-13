/**
* @file repo/models/cycle-template.js
* @overview cycle template model
*/

import Bluebird from 'bluebird'

export default function model({ core, entities, helpers, postgres, utils }) {
  const { Resource } = core
  const { ResourceEntity } = entities
  const { knex, throwOnDbError } = postgres

  /**
   * @param {object} params.log   - repo logger
   * @return {object}
   */
  return function DomainResourceModel({ log }) {
    const type = Resource.DomainResource

    // create
    async function create({ data }) {
      return knex.transaction(async (trx) => {
        try {
          const resourceInsert = utils.composeUpsert({ data, method: 'create', type })
          const [record] = await trx(ResourceEntity.table)
            .insert(resourceInsert)
            .returning(ResourceEntity.fields)

          return { data: [{ type, record }] }
        } catch (error) {
          if (log.enabled === 'true') log.error(error)
          return throwOnDbError({ error })
        }
      })
    }

    // destroy (delete)
    async function destroy({ id }) {
      const [record] = await knex(ResourceEntity.table)
        .where(ResourceEntity.Field.Deleted, false)
        .where(ResourceEntity.Field.Id, id)
      helpers.throwOnNotFound({ id, data: record })

      const destroyUpsert = utils.composeUpsert({ method: 'destroy' })
      await Bluebird.try(() => knex(ResourceEntity.table)
        .where(ResourceEntity.Field.Id, id)
        .update(destroyUpsert))

      return undefined
    }

    // detail
    async function detail({ id }) {
      const [record] = await knex.from(ResourceEntity.table)
        .select(ResourceEntity.fields)
        .where(ResourceEntity.Field.Deleted, false)
        .where(ResourceEntity.Field.Id, id)

      helpers.throwOnNotFound({ id, data: record })

      return { data: [{ type, record }] }
    }

    // list
    async function list(params) {
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

      Object.entries(filters).forEach(([k, v]) => {
        query.where(k, v)
        totalQuery.where(k, v)
      })

      const resourceRecords = await query
      const [{ count }] = await totalQuery

      const data = await Bluebird.map(resourceRecords, async (record) => ({ type, record }))
      const meta = { paging: helpers.composePagingData({ count, limit, offset }) }

      return { data, meta }
    }

    // update
    async function update({ data, id }) {
      let record
      try {
        const resourceUpdate = utils.composeUpsert({ data, type })
        const [rec] = await knex(ResourceEntity.table)
          .where(ResourceEntity.Field.Id, id)
          .update(resourceUpdate)
          .returning(ResourceEntity.fields)
        record = rec
      } catch (error) {
        if (log.enabled === 'true') log.error(error)
        return throwOnDbError({ error })
      }

      helpers.throwOnNotFound({ id, data: record })

      return { data: [{ type, record }] }
    }

    return { create, destroy, detail, list, type, update }
  }
}

export const inject = {
  require: {
    core: 'core',
    entities: 'entities',
    helpers: 'repo/helpers',
    postgres: 'postgres',
    utils: 'repo/models/utils',
  },
}
