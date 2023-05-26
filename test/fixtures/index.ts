import chance from './chance'

import { exampleResource, exampleResourceBody } from './api/example-resource'

import { exampleEntityRecord } from './db/example-entity'

import {
  integerId,
  modifiedFields,
  status,
} from './utils/helpers'

chance.mixin({
  exampleEntityRecord,
  exampleResource,
  exampleResourceBody,
  integerId,
  modifiedFields,
  status,
})

export default chance
