/**
* @file repo/models/index.ts
* @overview repository models
*/

export default function index({ core, models }) {
  const { InternalServerError, Resource } = core

  function getModel({ log, type }) {
    switch (type) {
      case Resource.DomainResource: return models.domainResource({ log })
      default: throw new InternalServerError(`invalid resource type '${type}'`)
    }
  }

  return { getModel }
}

export const inject = {
  require: {
    core: 'core',
    models: {
      domainResource: 'repo/models/resource',
    },
  },
}
