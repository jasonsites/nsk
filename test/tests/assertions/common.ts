import chai from 'chai'
import chaiUUID from 'chai-uuid'
import config from 'config'

import { APIResponseHealthCheck, PagingDefaults } from '../../types'

const { expect } = chai
chai.use(chaiUUID)

const { defaultLimit, defaultOffset }: PagingDefaults = config.get('api.paging')

type AssertErrorParams = {
  actual: { detail: string, status: number, title: string }
  detail: string
  status: number
  title: string
}

export function assertError(params: AssertErrorParams) {
  const { actual, detail, status, title } = params
  expect(actual).to.be.an('object').with.all.keys(['detail', 'status', 'title'])
  expect(actual.detail).to.equal(detail)
  expect(actual.status).to.equal(status)
  expect(actual.title).to.equal(title)
}

type AssertErrorThrownParams = {
  call: () => void
  message: string
  type?: string
}

export function assertErrorThrown(params: AssertErrorThrownParams) {
  const { call, message, type } = params
  expect(call).to.throw(type, message)
}

type AssertErrorWithSourceParams = {
  actual: { detail: string, source: { pointer: string }, status: number, title: string }
  detail: string
  pointer: string
  status: number
  title: string
}

export function assertErrorWithSource(params: AssertErrorWithSourceParams) {
  const { actual, detail, pointer, status, title } = params
  expect(actual).to.be.an('object').with.all.keys(['detail', 'source', 'status', 'title'])
  expect(actual.detail).to.equal(detail)
  expect(actual.source).to.be.an('object').with.all.keys(['pointer'])
  expect(actual.source.pointer).to.equal(pointer)
  expect(actual.status).to.equal(status)
  expect(actual.title).to.equal(title)
}

type AssertErrorsParams = {
  actual: { errors: any[] }
  errors: () => void
  length: number
}

export function assertErrors(params: AssertErrorsParams) {
  const { actual, errors, length } = params
  expect(actual).to.be.an('object').with.all.keys(['errors'])
  expect(actual.errors).to.be.an('array').with.lengthOf(length)
  errors()
}

type AssertHealthCheckParams = {
  actual: APIResponseHealthCheck
}

export function assertHealthCheck({ actual }: AssertHealthCheckParams) {
  expect(actual).to.be.an('object').with.all.keys(['meta'])
  expect(actual.meta).to.be.an('object').with.all.keys(['status'])
  expect(actual.meta.status).to.equal('healthy')
}

type AssertMetaPagingParams = {
  actual: { limit: number, offset: number, total: number }
  limit?: number
  offset?: number
  total?: number
}

export function assertMetaPaging(params: AssertMetaPagingParams) {
  const { actual, limit = defaultLimit, offset = defaultOffset, total = 0 } = params
  expect(actual).to.be.an('object').with.all.keys(['limit', 'offset', 'total'])
  expect(actual.limit).to.equal(limit)
  expect(actual.offset).to.equal(offset)
  expect(actual.total).to.equal(total)
}

type AssertMultParams = {
  actual: { data: any[], meta: { paging: any } }
  resources: () => void
  paging?: () => void
}

export function assertMult(params: AssertMultParams) {
  const { actual, resources, paging } = params
  expect(actual).to.be.an('object').with.all.keys(['data', 'meta'])
  expect(actual.meta).to.be.an('object').with.all.keys(['paging'])
  expect(actual.data).to.be.an('array')
  resources()
  if (paging) paging()
}

type AssertSoftDeleteParams = {
  actual: { deleted: boolean }
}

export function assertSoftDelete({ actual }: AssertSoftDeleteParams) {
  expect(actual.deleted).to.be.true
}

type AssertSoloParams = {
  actual: { data: any }
  resource: () => void
}

export function assertSolo(params: AssertSoloParams) {
  const { actual, resource } = params
  expect(actual).to.be.an('object').with.all.keys(['data'])
  expect(actual.data).to.be.an('object')
  resource()
}

export function assertValidDatetimeISO({ iso }: { iso: string }) {
  // const valid = moment(iso, moment.ISO_8601).isValid()
  // expect(valid).to.equal(true)
}
