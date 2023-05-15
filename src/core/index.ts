/**
 * @file common structures to be used across application layers
 */

import type { CoreTypes, ErrorTypes } from '../types/core'

interface Dependencies {
  errors: ErrorTypes
}

export default function core(deps: Dependencies): CoreTypes {
  const { errors } = deps

  const DomainModel = {
    ExampleDomainModel: 'example-domain-model',
  }

  return { ...errors, DomainModel }
}

export const inject = {
  name: 'core',
  require: {
    errors: 'core/errors',
  },
}
