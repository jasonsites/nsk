/**
 * @file core/index.ts
 * @overview common structures to be used across layers
 */

export default function core({ errors }) {
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
