import chance from '../chance'

type DomainResourceRecordParams = {
  deleted?: boolean
  description?: string
  enabled?: boolean
  id?: string
  modified?: boolean
  status?: string
  title?: string
  user_id?: number
}

export function domainResourceRecord(params: DomainResourceRecordParams = {}) {
  const defaults = {
    deleted: false,
    description: chance.sentence(),
    enabled: true,
    modified: false,
    status: chance.integer({ min: 0, max: 4 }),
    title: chance.word({ length: 8 }),
    user_id: 1,
  }

  params = { ...defaults, ...params }

  validateParams()

  const {
    deleted,
    description,
    enabled,
    id,
    modified,
    status,
    title,
    user_id,
  } = params

  const record = {
    created_by: user_id,
    deleted,
    description,
    enabled,
    status,
    title,
    ...chance.modifiedFields({ modified, user_id }),
  }

  if (id) {
    record.id = id
    record.created_on = chance.date()
  }

  return record
}

function validateParams() {
  return undefined
}

export default { domainResourceRecord }
