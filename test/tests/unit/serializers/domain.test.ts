import { before, describe, it } from 'mocha'

import assertions from '../../assertions'
import chance from '../../../fixtures'
import { loadModules } from '../../../utils'


describe('[unit] http.serializers.domain', function () {
  before('load modules', async function () {
    this.timeout(30000)
    await loadModules.call(this, { core: 'core', serializers: 'serializers' })
  })

  it('should serialize a single domain resource', function () {
    // test code
  })

  it('should serialize a multiple domain resources', function () {
    // test code
  })
})
