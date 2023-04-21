/**
 * @file core/index.ts
 * @overview common structures to be used across layers
 */

import type { CoreTypes, ErrorTypes } from '../types/globals'

interface Dependencies {
  errors: ErrorTypes
}

export default function core({ errors }: Dependencies): CoreTypes {
  const Resource = {
    DomainResource: 'resource',
  }

  return { ...errors, Resource }
}

export const inject = {
  name: 'core',
  require: {
    errors: 'core/errors',
  },
}
