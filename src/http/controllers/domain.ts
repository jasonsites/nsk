/**
 * @file controller (http routes handlers)
 */

import { Context } from 'koa'

import type { CorrelationWithType } from '../../types/core'
import type { DomainModule, DomainService } from '../../types/domain-services'
import type { Controller, HTTPResource } from '../types'
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
    const { correlation, type }: CorrelationWithType = ctx.state
    const { body, method } = ctx.request
    validation.context(correlation).validateBody({ body, method, type })
    const { data: { properties } }: HTTPResource = body
    const service: DomainService = domain.getService(type)
    const result = await service.context(correlation).create({ data: properties, type })
    ctx.body = serializers.serialize({ input: result, solo: true })
    ctx.status = 201
    ctx.type = 'application/json'
  }

  async function destroy(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { id }: { id: string } = ctx.params
    const service: DomainService = domain.getService(type)
    await service.context(correlation).destroy({ id, type })
    ctx.status = 204
  }

  async function detail(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { id }: { id: string } = ctx.params
    const service: DomainService = domain.getService(type)
    const result = await service.context(correlation).detail({ id, type })
    console.log('result', result)
    ctx.body = serializers.serialize({ input: result, solo: true })
    ctx.status = 200
    ctx.type = 'application/json'
  }

  async function list(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { querystring } = ctx.request
    const query = utils.parseQuery(querystring)
    validation.context(correlation).validateQuery({ query, type })
    const { filters, page, sort } = utils.transformQuery(query)
    const service: DomainService = domain.getService(type)
    const result = await service.context(correlation).list({ filters, page, sort, type })
    ctx.body = serializers.serialize({ input: result, solo: false })
    ctx.status = 200
    ctx.type = 'application/json'
  }

  async function update(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { id }: { id: string } = ctx.params
    const { body, method } = ctx.request
    validation.context(correlation).validateBody({ body, id, method, type })
    const { data: { properties } }: HTTPResource = body
    const service: DomainService = domain.getService(type)
    const result = await service.context(correlation).update({ data: properties, id, type })
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
