/**
 * @file controller utilities
 */

import config from 'config'
import qs from 'qs'

import type { ParsedQs } from 'qs'
import type { DefaultOrder, SortingData } from '../../types/pagination'
import type { ApiConfiguration } from '../types'

export default function utils() {
  const { paging, sorting }: ApiConfiguration = config.get('api')
  const { defaultLimit, defaultOffset } = paging
  const { defaultOrder, defaultProp } = sorting

  function pageSettings(params: { limit?: string; offset?: string; } = {}) {
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

  function sortSettings(params: { order?: DefaultOrder; prop?: string; } = {}): SortingData {
    const { order, prop } = params

    const o: DefaultOrder = order || defaultOrder
    const p: string = prop || defaultProp

    return { order: o, prop: p }
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
