/**
 * @file controller utilities type definitions
 */

export type ControllerUtilities = {
  pageSettings: (params?: PageSettingsParams) => PageSettings
  parseQuery: (querystring: string) => ParsedQs
  sortSettings: (params?: SortSettingsParams) => SortSettings
  transformQuery: (query: TransformQueryParams) => QueryParameters
}

type PageSettingsParams = {
  limit?: string
  offset?: string
}

type PageSettings = {
  limit: number
  offset: number
}

type SortSettingsParams = {
  order?: DefaultOrder
  prop?: string
}

type TransformQueryParams = {
  f: object
  p: object
  s: object
}

type QueryParameters = {
  filters: object
  page: PageSettings
  sort: SortSettings
}
