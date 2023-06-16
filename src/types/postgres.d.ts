/**
 * @file postgres client type definitions
 */

export type ThrowOnDBError = (params: ThrowOnDBErrorParams) => void

// export type ThrowOnDBErrorParams = { error: { code?: string } }
export type ThrowOnDBErrorParams = { error: { code?: string, message?: string } }
