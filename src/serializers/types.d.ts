/**
 * @file
 */

import type { DomainObject } from '../types/domain-models'

// serialization types ------------------------------------------
export type Result = {
  meta?: any,
  data?: any,
}

export interface Serializer {
  serialize: (params: { obj: DomainObject, type: string }) => any
}
