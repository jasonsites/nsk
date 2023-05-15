/**
 * @file controller utilities type definitions
 */

export type QueryUtilities = {
  parseQuery: (querystring: string) => ParsedQs
  transformQuery: (query: TransformQueryParams) => QueryParameters
}

// page
type PageQueryParams = {
  limit?: string
  offset?: string
}

type PagingDefaults = {
  defaultLimit: number
  defaultOffset: number
}

type PageSettings = {
  limit: number
  offset: number
}

// sort
type SortQueryParams = {
  order?: SortOrderOptions
  prop?: string
}

type SortingDefaults = {
  defaultOrder: SortOrderOptions
  defaultProp: string
}

type SortSettings = {
  order: SortOrderOptions
  prop: string
}

// transform
type TransformQueryParams = {
  f: object
  p: PageSettings
  s: SortSettings
}

type QueryParameters = {
  filters: object
  page: PageSettings
  sort: SortSettings
}
