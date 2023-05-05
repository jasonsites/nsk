import chance from './chance'

import { domainResource, domainResourceBody } from './api/domain-resource'

import { domainResourceRecord } from './db/domain-resource'

import {
  integerId,
  modifiedFields,
  status,
} from './utils/helpers'

chance.mixin({
  domainResource,
  domainResourceBody,
  domainResourceRecord,
  integerId,
  modifiedFields,
  status,
})

export default chance
