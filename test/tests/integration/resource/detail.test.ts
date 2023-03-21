import { createServer } from 'node:http'

import config from 'config'
import { range } from 'lodash'
import { afterEach, before, describe, it } from 'mocha'
import sinon from 'sinon'
import { agent } from 'supertest'

import assertions from '../../assertions'
import chance from '../../../fixtures'
import { bootstrap, loadModules } from '../../../utils'

describe('[integration] GET /{namespace}/resources/{id}', async function () {
  before('load modules', async function () {
    this.timeout(30000)
    await bootstrap()
    await loadModules.call(this, {
      api: 'api/example',
      app: 'http/app',
      core: 'core',
      service: 'services/example',
    })
    this.namespace = config.get('api.namespace')
    this.request = agent(createServer(this.app.callback()))
    this.sandbox = sinon.createSandbox()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  describe('failure states', function () {
    it('fails (400) with invalid payload', async function () {
      const { core: { ErrorType, ValidationError }, namespace } = this

      this.sandbox.stub(this.api, 'client').rejects(new ValidationError('validation error'))

      const id = chance.guid()
      const status = 400

      return this.request
        .get(`/${namespace}/resources/${id}`)
        .expect(status)
        .then(({ body: actual }) => {
          const expectations = [{
            detail: 'validation error',
            status,
            title: ErrorType.Validation,
          }]
          const { length } = expectations
          const errors = () => range(length)
            .map((idx) => assertions.common.assertError({
              ...{ actual: actual.errors[idx] },
              ...expectations[idx],
            }))
          assertions.common.assertErrors({ actual, errors, length })
        })
    })
  })

  describe('success states', function () {
    it('succeeds (200) with valid payload', async function () {
      const { core, namespace } = this

      const id = 99
      const body = chance.domainResourceBody(core, { id, name: 'example' })
      const status = 200

      return this.request
        .get(`/${namespace}/resources/${id}`)
        .expect(status)
        .then(({ body: actual }) => {
          const resource = () => assertions.api.assertDomainResource({
            actual: actual.data,
            expected: body.data,
          })
          assertions.common.assertSingle({ actual, resource })
        })
    })
  })
})
