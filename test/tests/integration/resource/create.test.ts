import { createServer } from 'node:http'

import config from 'config'
import { range } from 'lodash'
import { afterEach, before, describe, it } from 'mocha'
import sinon from 'sinon'
import { agent } from 'supertest'

import assertions from '../../assertions'
import chance from '../../../fixtures'
import { bootstrap, loadModules } from '../../../utils'

describe('[integration] POST /{namespace}/resources', function () {
  before('load modules', async function () {
    this.timeout(30000)
    await bootstrap()
    await loadModules.call(this, { app: 'http/app', core: 'core' })
    this.namespace = config.get('api.namespace')
    this.request = agent(createServer(this.app.callback()))
    this.sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  describe('failure states', function () {
    it('fails (400) with invalid payload', async function () {
      const { core: { ErrorType }, namespace } = this

      const body = { foo: 'bar' }
      const status = 400

      return this.request
        .post(`/${namespace}/resources`)
        .send(body)
        .expect(status)
        .then(({ body: actual }) => {
          const expectations = [{
            detail: '"data" is required',
            pointer: '/data',
            status,
            title: ErrorType.Validation,
          }, {
            detail: '"foo" is not allowed',
            pointer: '/foo',
            status,
            title: ErrorType.Validation,
          }]
          const { length } = expectations
          const errors = () => range(length)
            .map((idx) => assertions.common.assertErrorWithSource({
              ...{ actual: actual.errors[idx] },
              ...expectations[idx],
            }))

          assertions.common.assertErrors({ actual, errors, length })
        })
    })
  })

  describe('success states', function () {
    it('succeeds (201) with valid payload', async function () {
      const { core, namespace } = this

      const body = chance.domainResourceBody(core)
      const expected = { id: 1, ...body.data }

      return this.request
        .post(`/${namespace}/resources`)
        .send(body)
        .expect(201)
        .then(({ body: actual }) => {
          const resource = () => assertions.api.assertDomainResource({
            actual: actual.data,
            expected,
          })
          assertions.common.assertSolo({ actual, resource })
        })
    })
  })
})
