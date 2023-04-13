/**
* @file repo/models/utils.ts
* @overview repository upsert model utilities
*/

export default function utils({ core, postgres }) {
  const { Resource } = core
  const { knex } = postgres

  /**
   * returns insert/update object for repo entity operations
   * NOTE: implicitly relying on request validation to ensure data model integrity
   * @param {object} params.data    - resource data
   * @param {string} params.method  - entity operation
   * @param {string} params.type    - resource type
   * @returns {object}
   */
  function composeUpsert({ data, method = 'update', type }) {
    const user_id = 9999 // TODO: get from context

    // destroy
    if (method === 'destroy') return softDelete({ user_id })

    // create or (implicit) update
    const entity = enforceUpsertFields({ data, type })
    if (method === 'create') return { ...entity, ...created({ user_id }) }
    return { ...entity, ...modified({ user_id }) }
  }

  // action augmentations ------------------------------------------------

  function created({ user_id }) {
    return { created_by: user_id }
  }

  function modified({ user_id }) {
    return { modified_on: knex.fn.now(), modified_by: user_id }
  }

  function softDelete({ user_id }) {
    return { deleted: true, ...modified({ user_id }) }
  }

  // field enforcement ---------------------------------------------------

  function enforceUpsertFields({ data, type }) {
    switch (type) {
      case Resource.DomainResource: return domainResource({ data })
      default: throw new Error(`invalid entity type '${type}'`)
    }
  }

  function domainResource({ data }) {
    const { description, enabled, status, title } = data
    return { description, enabled, status, title }
  }

  return { composeUpsert }
}

export const inject = {
  require: {
    core: 'core',
    postgres: 'postgres',
  },
}
