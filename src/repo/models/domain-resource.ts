/**
* @file repo/models/domain-resource.ts
* @overview example domain resource model
*/

import { v4 as uuidv4 } from 'uuid'

export default function model({ core }) {
  const { Resource } = core

  return function domainResource({ log }) {
    const type = Resource.DomainResource

    async function create({ data }) {
      return {
        data: [{
          type,
          id: uuidv4(),
          properties: data,
        }],
      }
    }

    async function detail({ id }) {
      log.info(id)

      const meta = { context: 'example' }
      const properties = { name: 'example' }

      return {
        data: [{
          type,
          id: parseInt(id, 10),
          meta,
          properties,
        }],
      }
    }

    async function list() {
      const meta = { context: 'example' }
      const properties = { name: 'example' }

      return {
        data: [{
          type,
          id: uuidv4(),
          meta,
          properties,
        }],
      }
    }

    return { create, detail, list, type }
  }
}

export const inject = {
  require: {
    core: 'core',
    entities: {
      dbEntity: 'repo/entities/db-entity',
    },
  },
}
