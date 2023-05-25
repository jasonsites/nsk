/* eslint-disable import/prefer-default-export */
// TODO: remove eslint-disable comment once there is more than one export

import chai from 'chai'
import chaiUUID from 'chai-uuid'

import { assertValidDatetimeISO } from './common'

import type { CoreTypes } from '../../../src/types/core'

const { expect } = chai
chai.use(chaiUUID)

type AssertExampleResourceParams = {
  actual: any
  core: CoreTypes
  expected: any
  modified?: boolean
}

export function assertExampleResource(params: AssertExampleResourceParams) {
  const { actual, core, expected, modified = false } = params
  const { record } = expected

  expect(actual).to.be.an('object').with.all.keys(['type', 'id', 'properties'])
  const { type, id, properties } = actual
  expect(type).to.equal(core.model.example)
  expect(id).to.equal(record.id)
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
  expect(properties.created_by).to.equal(record.created_by)
  expect(properties.created_on).to.equal(record.created_on.toISOString())
  expect(properties.description).to.equal(record.description)
  expect(properties.enabled).to.equal(record.enabled)
  if (modified) {
    expect(properties.modified_by).to.equal(1)
    assertValidDatetimeISO({ iso: properties.modified_on })
  } else {
    expect(properties.modified_by).to.be.null
    expect(properties.modified_on).to.be.null
  }
  expect(properties.status).to.equal(record.status)
  expect(properties.title).to.equal(record.title)
}
