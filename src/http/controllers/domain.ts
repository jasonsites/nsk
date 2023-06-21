/**
 * @file controller (http routes handlers)
 */

import type { Context } from 'koa'
import type { ParsedQs } from 'qs'
import type { CorrelationWithType } from '../../types/correlation'
import type { DomainModel } from '../../types/domain/models'
import type { Serializer } from '../../types/domain/serializers'
import type { DomainModule, DomainService } from '../../types/domain/services'
import type { Controller, HTTPResource } from '../types'
import type { HTTPBodyMethod, Validator, ValidationModule } from '../validation/types'
import type { QueryUtilities, TransformQueryParams } from './types'

interface Dependencies {
  domain: DomainModule
  serializers: Serializer
  utils: QueryUtilities
  validation: ValidationModule
}

export default function controller(deps: Dependencies): Controller {
  const { domain, serializers, utils, validation } = deps

  async function create(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { body, method } = ctx.request
    const validator: Validator = validation.context(correlation)
    validator.validateBody({ body, method: (method as HTTPBodyMethod), type })
    const { data: { properties } }: HTTPResource = body
    const service: DomainService = domain.service(type).context(correlation)
    const model: DomainModel = await service.create({ data: properties, type })
    ctx.body = serializers.serialize({ model })
    ctx.status = 201
    ctx.type = 'application/json'
  }

  async function destroy(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { id }: { id: string } = ctx.params
    const service: DomainService = domain.service(type).context(correlation)
    await service.destroy({ id, type })
    ctx.status = 204
  }

  async function detail(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { id }: { id: string } = ctx.params
    const service: DomainService = domain.service(type).context(correlation)
    const model: DomainModel = await service.detail({ id, type })
    ctx.body = serializers.serialize({ model })
    ctx.status = 200
    ctx.type = 'application/json'
  }

  async function list(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { querystring } = ctx.request
    const query: ParsedQs = utils.parseQuery(querystring)
    const validator: Validator = validation.context(correlation)
    validator.validateQuery({ list: true, query, type })
    const { filters, page, sort } = utils.transformQuery(query as unknown as TransformQueryParams)
    const service: DomainService = domain.service(type).context(correlation)
    const model: DomainModel = await service.list({ filters, page, sort, type })
    ctx.body = serializers.serialize({ model })
    ctx.status = 200
    ctx.type = 'application/json'
  }

  async function update(ctx: Context): Promise<void> {
    const { correlation, type }: CorrelationWithType = ctx.state
    const { id }: { id: string } = ctx.params
    const { body, method } = ctx.request
    const validator: Validator = validation.context(correlation)
    validator.validateBody({ body, id, method: (method as HTTPBodyMethod), type })
    const { data: { properties } }: HTTPResource = body
    const service: DomainService = domain.service(type).context(correlation)
    const model: DomainModel = await service.update({ data: properties, id, type })
    ctx.body = serializers.serialize({ model })
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
