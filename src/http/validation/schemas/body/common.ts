/**
 * @file validation/schemas/common.ts
 * @overview common schemas across types
 */

import joi from 'joi'

export default function common({ core }) {
  /**
   * returns a schema function for a single resource request of `type`
   * @param {Function} params.type - schema type function with signature `type({ method })`
   * @return {Function}
   */
  function single({ type }) {
    /**
     * create joi validation schema for single resource request body
     * @param  {String} params.method - http request method (POST, PUT)
     * @return {Object}
     */
    return ({ method }) => joi.object().keys({
      meta: joi.object(),
      data: joi.object().keys(type({ core, method })).required(),
    }).required()
  }

  return { single }
}

export const inject = {
  require: {
    core: 'core',
  },
}
