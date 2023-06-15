/**
 * @file correlation type definitions
 */

// correlation
export type Correlation = {
  headers: Record<string, string>
  req_id: string
}

export type CorrelationWithType = {
  correlation: Correlation
  type: string
}
