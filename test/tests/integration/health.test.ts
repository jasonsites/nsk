import { createServer } from 'node:http'

import Bluebird from 'bluebird'
import config from 'config'
import { before, describe, it } from 'mocha'
import { agent } from 'supertest'

import assertions from '../assertions'
import { bootstrap, loadModules } from '../../utils'

import type { APIResponseHealthCheck } from '../../types'

describe('[integration] /{namespace}/health', function () {
  before('load modules', async function () {
    this.timeout(30000)
    await bootstrap()
    await loadModules(this, { app: 'http/app' })
    this.namespace = config.get('api.namespace')
    this.request = agent(createServer(this.app.callback()))
  })

  describe('success states', function () {
    it('succeeds (200) with healthy status', async function () {
      const { namespace } = this

      return this.request
        .get(`/${namespace}/health`)
        .expect(200)
        .then(({ body: actual }: { body: APIResponseHealthCheck }) => {
          assertions.common.assertHealthCheck({ actual })
        })
    })
  })
})
