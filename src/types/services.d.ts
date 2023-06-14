/**
 * @file external service type definitions
 */

import type { Correlation } from './core'

export interface ExternalService {
  context: (correlation: Correlation) => { get: () => Promise<unknown> }
}
