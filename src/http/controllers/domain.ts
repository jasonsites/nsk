/**
 * @file controller (http routes handlers)
 */

import { Context } from 'koa'

import type { DomainModule } from '../../types/domain'
import type { Controller } from '../types'
import type { QueryUtilities } from './types'

// TODO: types
interface Dependencies {
  domain: DomainModule,
  serializers: any,
  utils: QueryUtilities,
  validation: any,
}

export default function controller(deps: Dependencies): Controller {
  const { domain, serializers, utils, validation } = deps

  async function create(ctx: Context): Promise<void> {
    const { correlation, type } = ctx.state
    const { body, method } = ctx.request
    validation.context(correlation).validateBody({ body, method, type })
    const { data: { properties } } = body
    const result = await domain.context(correlation).create({ data: properties, type })
    ctx.body = serializers.serialize({ input: result, solo: true })
    ctx.status = 201
    ctx.type = 'application/json'
  }

  async function destroy(ctx: Context): Promise<void> {
    const { correlation, type } = ctx.state
    const { id } = ctx.params
    await domain.context(correlation).destroy({ id, type })
    ctx.status = 204
  }

  async function detail(ctx: Context): Promise<void> {
    const { correlation, type } = ctx.state
    const { id } = ctx.params
    const result = await domain.context(correlation).detail({ id, type })
    ctx.body = serializers.serialize({ input: result, solo: true })
    ctx.status = 200
    ctx.type = 'application/json'
  }

  async function list(ctx: Context): Promise<void> {
    const { correlation, type } = ctx.state
    const { querystring } = ctx.request
    const query = utils.parseQuery(querystring)
    validation.context(correlation).validateQuery({ query, type })
    const { filters, page, sort } = utils.transformQuery(query)
    const result = await domain.context(correlation).list({ filters, page, sort, type })
    ctx.body = serializers.serialize({ input: result, solo: false })
    ctx.status = 200
    ctx.type = 'application/json'
  }

  async function update(ctx: Context): Promise<void> {
    const { correlation, type } = ctx.state
    const { id } = ctx.params
    const { body, method } = ctx.request
    validation.context(correlation).validateBody({ body, id, method, type })
    const { data: { properties } } = body
    const result = await domain.context(correlation).update({ data: properties, id, type })
    ctx.body = serializers.serialize({ input: result, solo: true })
    ctx.status = 200
    ctx.type = 'application/json'
  }

  return { create, destroy, detail, list, update }
}

export const inject = {
  require: {
    domain: 'domain',
    serializers: 'serializers',
    utils: 'http/controllers/query',
    validation: 'validation',
  },
}
