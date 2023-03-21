/**
 * @file http/serializers/types.ts
 * @overview
 */

export default function types() {
  function serializeDomainResource({ id, meta, properties, type }) {
    return { type, id, meta, properties }
  }

  return { serializeDomainResource }
}

export const inject = {}
