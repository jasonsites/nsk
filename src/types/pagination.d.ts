/**
 * @file pagination type definitions
 */

export type DefaultOrder = 'asc' | 'desc'

export type PagingData = {
  limit: number
  offset: number
  total: number
}

export type PagingDefaults = {
  defaultLimit: number
  defaultOffset: number
}

export type SortingData = {
  order: DefaultOrder
  prop: string
}

export type SortingDefaults = {
  defaultOrder: DefaultOrder
  defaultProp: string
}
