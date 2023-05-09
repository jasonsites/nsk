
export type APIResource = {
  type: string,
  id: string,
  properties: { [key: string]: any },
}

export type APIResponseErrors = {
  errors: { detail: string, source: { pointer: string }, status: number, title: string }[]
}

export type APIResponseHealthCheck = {
  meta: { status: string }
}

export type APIResponseMult = {
  data: APIResource[],
  meta?: { paging: { limit: number, offset: number, total: number } }
}

export type APIResponseSolo = {
  data: APIResource,
  meta?: { paging: { limit: number, offset: number, total: number } }
}

export type PagingDefaults = {
  defaultLimit: number,
  defaultOffset: number
}
