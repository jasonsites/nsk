/**
 * @file
 */

import type { ExampleDomainModel } from '../types/domain'
import type { PagingData } from '../types/pagination'

// serialization types ------------------------------------------
export type Result = {
  meta?: any,
  data?: any,
}

export type SerializableInput = {
  data: SerializableInputData,
  meta?: SerializableInputMeta,
}

export type SerializableInputData = SerializableInputDataSingle[]

export type SerializableInputDataSingle = {
  type: string
  meta?: unknown
  record: DomainModel
  rel?: {
    type: string
    data: unknown[]
  }[],
}

export type SerializableInputMeta = {
  paging: PagingData
}

// domain resources ---------------------------------------------
export type DomainModel = ExampleDomainModel // | SomeOtherDomainModel | ...

export interface Serializer {
  serialize: (params: { model: DomainModel, type: string }) => any
}
