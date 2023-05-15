/**
 * @file external service type definitions
 */

export interface ExternalService {
  context: (correlation: Correlation) => { get: () => Promise<unknown> }
}
