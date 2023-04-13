import chai from 'chai'
import chaiUUID from 'chai-uuid'
import config from 'config'

const { expect } = chai
chai.use(chaiUUID)

const { defaultLimit, defaultOffset } = config.get('api.paging')

export function assertError({ actual, detail, status, title }) {
  expect(actual).to.be.an('object').with.all.keys(['detail', 'status', 'title'])
  expect(actual.detail).to.equal(detail)
  expect(actual.status).to.equal(status)
  expect(actual.title).to.equal(title)
}

export function assertErrorThrown({ call, message, type = Error }) {
  expect(call).to.throw(type, message)
}

export function assertErrorWithSource({ actual, detail, pointer, status, title }) {
  expect(actual).to.be.an('object').with.all.keys(['detail', 'source', 'status', 'title'])
  expect(actual.detail).to.equal(detail)
  expect(actual.source).to.be.an('object').with.all.keys(['pointer'])
  expect(actual.source.pointer).to.equal(pointer)
  expect(actual.status).to.equal(status)
  expect(actual.title).to.equal(title)
}

export function assertErrors({ actual, errors, length }) {
  expect(actual).to.be.an('object').with.all.keys(['errors'])
  expect(actual.errors).to.be.an('array').with.lengthOf(length)
  errors()
}

export function assertHealthCheck({ actual }) {
  expect(actual).to.be.an('object').with.all.keys(['meta'])
  expect(actual.meta).to.be.an('object').with.all.keys(['status'])
  expect(actual.meta.status).to.equal('healthy')
}

export function assertMetaPaging(params) {
  const { actual, limit = defaultLimit, offset = defaultOffset, total = 0 } = params
  expect(actual).to.be.an('object').with.all.keys(['limit', 'offset', 'total'])
  expect(actual.limit).to.equal(limit)
  expect(actual.offset).to.equal(offset)
  expect(actual.total).to.equal(total)
}

export function assertMult({ actual, resources, paging }) {
  expect(actual).to.be.an('object').with.all.keys(['data', 'meta'])
  expect(actual.meta).to.be.an('object').with.all.keys(['paging'])
  expect(actual.data).to.be.an('array')
  resources()
  if (paging) paging()
}

export function assertSoftDelete({ actual }) {
  expect(actual.deleted).to.be.true
}

export function assertSolo({ actual, resource }) {
  expect(actual).to.be.an('object').with.all.keys(['data'])
  expect(actual.data).to.be.an('object')
  resource()
}

export function assertValidDatetimeISO({ iso }) {
  // const valid = moment(iso, moment.ISO_8601).isValid()
  // expect(valid).to.equal(true)
}
