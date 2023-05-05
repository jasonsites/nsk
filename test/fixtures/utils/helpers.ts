import chance from '../chance'

export function integerId() {
  // min cannot be 1 since id:1 is used as implicit default in builders
  return chance.integer({ min: 2, max: 999999 })
}

export function modifiedFields(params: { modified?: boolean, user_id?: number } = {}) {
  const { modified = false, user_id = 1 } = params
  return {
    modified_by: modified ? user_id : null,
    modified_on: modified ? chance.date() : null,
  }
}

export function status(params: { list?: number[] } = {}) {
  const defaults = { list: [0, 1, 2, 3, 4] }
  params = { ...defaults, ...params }
  const { list } = params
  return chance.pickone(list)
}
