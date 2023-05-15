/**
 * @file pagination type definitions
 */

export type SortOrderOptions = 'asc' | 'desc'

export type PageMetadata = {
  limit: number
  offset: number
  total: number
}

export type SortMetadata = {
  order: SortOrderOptions
  prop: string
}
