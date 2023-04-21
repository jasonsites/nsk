/**
 * @file http/controllers/utils.ts
 * @overview controller utilities
 */

import config from 'config'
import qs from 'qs'

import type { ParsedQs } from 'qs'
import type { ApiConfiguration } from '../../types/globals'

export default function utils() {
  const { paging, sorting }: ApiConfiguration = config.get('api')
  const { defaultLimit, defaultOffset } = paging
  const { defaultOrder, defaultProp } = sorting

  function pageSettings(params: { limit?: string, offset?: string } = {}) {
    const { limit, offset } = params

    let parsedLimit = limit ? parseInt(limit, 10) : defaultLimit
    if (Number.isNaN(limit)) parsedLimit = defaultLimit

    let parsedOffset = offset ? parseInt(offset, 10) : defaultOffset
    if (Number.isNaN(offset)) parsedOffset = defaultOffset

    return { limit: parsedLimit, offset: parsedOffset }
  }

  function parseQuery(querystring: string): ParsedQs {
    return qs.parse(querystring)
  }

  function sortSettings(params: { order?: string, prop?: string } = {}) {
    const { prop = defaultProp } = params
    let { order = defaultOrder } = params

    order = (order === 'desc' || order === 'asc') ? order : defaultOrder

    return { order, prop }
  }

  function transformQuery(query: { f: object, p: object, s: object}) {
    const { f: filters = {}, p = {}, s = {} } = query

    const page = pageSettings(p)
    const sort = sortSettings(s)

    return { filters, page, sort }
  }

  return { pageSettings, parseQuery, sortSettings, transformQuery }
}


export const inject = {}
