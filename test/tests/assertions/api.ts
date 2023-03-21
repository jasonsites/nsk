import chai from 'chai'
import chaiUUID from 'chai-uuid'

const { expect } = chai
chai.use(chaiUUID)

export default {
  assertDomainResource,
}

function assertDomainResource({ actual, expected }) {
  const { type, id, properties } = actual

  expect(type).to.equal(expected.type)
  expect(id).to.equal(expected.id)
  expect(properties).to.be.an('object').with.all.keys(['name'])
  expect(properties.name).to.equal(expected.properties.name)
}
