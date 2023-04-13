/**
 * @file repo/helpers.ts
 * @overview repository helper functions
 */

// TODO: ideally relocate these function to proper contextual areas

export default function helpers({ core }) {
  const { NotFoundError } = core

  // list for all models
  function composePagingData({ count, limit, offset }) {
    return { limit, offset, total: count }
  }

  // error
  function throwOnNotFound({ id, data, type = 'resource' }) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new NotFoundError(`unable to find ${type} with id '${id}'`)
    }
  }

  return {
    composePagingData,
    throwOnNotFound,
  }
}

export const inject = {
  require: {
    core: 'core',
  },
}
