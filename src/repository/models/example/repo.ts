/**
* @file example entity model
*/

import config from 'config'

import type { CoreTypes } from '../../../types/core'
import type { Correlation } from '../../../types/correlation'
import type { DomainModel } from '../../../types/domain-models'
import type { LoggerConfiguration, ScopedLogger } from '../../../types/logger'
import type { RepositoryModule } from '../../../types/repository'
import type { PostgresClient } from '../../../postgres/types'
import type { EntityData } from '../../entities/types'
import type {
  EntityModelMarshaller,
  RepositoryHandlerUtilities,
  RepositoryUpsertUtilities,
} from '../types'

interface Dependencies {
  core: CoreTypes
  entities: Record<string, EntityData>
  logger: ScopedLogger
  model: EntityModelMarshaller
  postgres: PostgresClient
  utils: {
    handler: RepositoryHandlerUtilities
    upsert: RepositoryUpsertUtilities
  }
}

export default function example(deps: Dependencies): RepositoryModule {
  const { core, entities, logger, model, postgres, utils } = deps
  const { client, throwOnDbError } = postgres

  const { enabled, label, level }: LoggerConfiguration = config.get('logger.domain')

  const type = core.model.example

  return {
    context: (correlation: Correlation) => {
      const { req_id } = correlation

      const log: ScopedLogger = logger.child({ module: label, req_id, level })
      log.enabled = enabled

      async function create(params: { data: any }): Promise<DomainModel> {
        const { data } = params

        try {
          const insert = utils.upsert.compose({ data, method: 'create', type })
          const record: any = await client
            .insertInto(entities.example.table)
            .values(insert)
            .returning(entities.example.fields)
            .executeTakeFirstOrThrow()

          return model.marshal({ data: [record] })
        } catch (error: any) {
          if (log.enabled) log.error(error)
          // @ts-expect-error catch block
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
          utils.handler.throwOnNotFound({ id, data: record })

          const destroyUpsert = utils.upsert.compose({ method: 'destroy' })
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

      async function detail(params: { id: string }): Promise<DomainModel> {
        const { id } = params

        try {
          const [record]: Array<any> = await client.selectFrom(entities.example.table)
            .select(entities.example.fields)
            .where(entities.example.field.Deleted, '=', false)
            .where(entities.example.field.Id, '=', id)
            .execute()

          utils.handler.throwOnNotFound({ id, data: record })

          return model.marshal({ data: [record] })
        } catch (error: any) {
          if (log.enabled) log.error(error)
          // @ts-expect-error catch block
          return throwOnDbError({ error })
        }
      }

      // TODO: params type
      async function list(params: {
        filters: any
        page: any
        sort: any
      }): Promise<DomainModel> {
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

          const records: Array<any> = await query.execute()
          const [{ count }] = await totalQuery.execute()

          const meta = { paging: utils.handler.marshalPageData({ count, limit, offset }) }

          return model.marshal({ data: records, meta, solo: false })
        } catch (error: any) {
          if (log.enabled) log.error(error)
          // @ts-expect-error catch block
          return throwOnDbError({ error })
        }
      }

      async function update(params: {
        data: any
        id: string
      }): Promise<DomainModel> {
        const { data, id } = params

        try {
          const updateData = utils.upsert.compose({ data, type })
          const record: any = await client
            .updateTable(entities.example.table)
            .set(updateData)
            .where(entities.example.field.Id, '=', id)
            .where(entities.example.field.Deleted, '=', false)
            .returning(entities.example.fields)
            .executeTakeFirstOrThrow()

          utils.handler.throwOnNotFound({ id, data: record })

          return model.marshal({ data: [record] })
        } catch (error: any) {
          if (log.enabled) log.error(error)
          // @ts-expect-error catch block
          return throwOnDbError({ error })
        }
      }

      return { create, destroy, detail, list, update }
    },
  }
}

export const inject = {
  require: {
    core: 'core',
    entities: 'entities',
    logger: 'logger',
    model: 'repository/models/example/model',
    postgres: 'postgres',
    utils: {
      handler: 'repository/models/handler',
      upsert: 'repository/models/upsert',
    },
  },
}
