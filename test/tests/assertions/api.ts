/* eslint-disable import/prefer-default-export */
// TODO: remove eslint-disable comment once there is more than one export

import chai from 'chai'
import chaiUUID from 'chai-uuid'

import * as common from './common'

import type { APIResource } from '../../types'

const { expect } = chai
chai.use(chaiUUID)

type AssertDomainResourceParams = {
  actual: APIResource
  expected: APIResource
  modified?: boolean
}

export function assertExampleResource(params: AssertDomainResourceParams) {
  const { actual, expected, modified = false } = params
  const { type, id, properties } = actual

  expect(type).to.equal(expected.type)
  expect(id).to.be.a.uuid('v4')
  expect(properties).to.be.an('object').with.all.keys([
    'created_by',
    'created_on',
    'description',
    'enabled',
    'modified_by',
    'modified_on',
    'status',
    'title',
  ])
  expect(properties.created_by).to.equal(1)
  common.assertValidDatetimeISO({ iso: properties.created_on })
  expect(properties.description).to.equal(expected.properties.description)
  expect(properties.enabled).to.equal(expected.properties.enabled)
  if (modified) {
    expect(properties.modified_by).to.equal(1)
    common.assertValidDatetimeISO({ iso: properties.modified_on })
  } else {
    expect(properties.modified_by).to.be.null
    expect(properties.modified_on).to.be.null
  }
  expect(properties.status).to.equal(expected.properties.status)
  expect(properties.title).to.equal(expected.properties.title)
}
