
export type CreateFieldMapParams = {
  attributes: Record<string, string>,
  entity: string,
}

export type EntityData = {
  Field: Record<string, string>,
  fields: string[],
  table: string,
}

export type Model = {
  create: (params: { data: any }) => Promise<RepoResult>
  destroy: (params: { id: string }) => Promise<void>
  detail: (params: { id: string }) => Promise<RepoResult>
  list: (params: { filters: any, page: any, sort: any }) => Promise<RepoResult>
  type: string
  update: (params: { data: any, id: string }) => Promise<RepoResult>
}

export type RepoResult = void | {
  data: {
    type: string,
    record: any,
  }[],
  meta?: {
    paging: any,
  },
}
