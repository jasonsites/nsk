import chance from '../chance'

export function domainResource(core, params: any = {}) {
  const defaults = {
    name: chance.word(),
  }

  params = { ...defaults, ...params }

  const { id, name } = params

  const resource: any = {
    type: core.Resource.DomainResource,
    properties: {
      name,
    },
  }

  if (id) resource.id = id

  return resource
}

export function domainResourceBody(core, params = {}) {
  return { data: domainResource(core, params) }
}
