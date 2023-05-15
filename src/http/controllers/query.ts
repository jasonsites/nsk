/**
 * @file controller utilities
 */

import config from 'config'
import qs from 'qs'

import type { ParsedQs } from 'qs'
import type { SortOrderOptions } from '../../types/pagination'
import type { ApiConfiguration } from '../types'
import type {
  PageQueryParams,
  PageSettings,
  QueryParameters,
  QueryUtilities,
  SortQueryParams,
  SortSettings,
  TransformQueryParams,
} from './types'

export default function utils(): QueryUtilities {
  const { paging, sorting }: ApiConfiguration = config.get('api')
  const { defaultLimit, defaultOffset } = paging
  const { defaultOrder, defaultProp } = sorting

  function handlePageParams(params: PageQueryParams = {}): PageSettings {
    const { limit, offset } = params

    let parsedLimit = limit ? parseInt(limit, 10) : defaultLimit
    if (Number.isNaN(limit)) parsedLimit = defaultLimit

    let parsedOffset = offset ? parseInt(offset, 10) : defaultOffset
    if (Number.isNaN(offset)) parsedOffset = defaultOffset

    return { limit: parsedLimit, offset: parsedOffset }
  }

  function handleSortParams(params: SortQueryParams = {}): SortSettings {
    const { order, prop } = params

    const o: SortOrderOptions = order || defaultOrder
    const p: string = prop || defaultProp

    return { order: o, prop: p }
  }

  function parseQuery(querystring: string): ParsedQs {
    return qs.parse(querystring)
  }

  function transformQuery(query: TransformQueryParams): QueryParameters {
    const { f: filters = {}, p = {}, s = {} } = query

    const page = handlePageParams(p)
    const sort = handleSortParams(s)

    return { filters, page, sort }
  }

  return { parseQuery, transformQuery }
}


export const inject = {}
