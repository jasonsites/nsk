/**
 * @file external service type definitions
 */

import type { Correlation } from './correlation'

export interface ExternalService {
  context: (correlation: Correlation) => { get: () => Promise<unknown> }
}
