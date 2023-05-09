/**
 * @file composes correlation object from tracing headers
 */

import config from 'config'

import type { Context, Next, Request } from 'koa'

type TracingConfig = {
  headers: string[]
}

export default function middleware() {
  const tracing: TracingConfig = config.get('api.tracing')

  return async function correlation(ctx: Context, next: Next) {
    const headers = getTracingHeaders(ctx.request)
    const req_id = headers['x-request-id']
    ctx.state = { correlation: { headers, req_id } }
    ctx.response.set('X-Request-ID', req_id)
    return next()
  }

  // https://istio.io/latest/docs/tasks/observability/distributed-tracing/overview/
  function getTracingHeaders(request: Request) {
    const { headers }: TracingConfig = tracing

    return headers.reduce((memo: Record<string, string>, h: string) => {
      memo[h] = request.get(h)
      return memo
    }, {})
  }
}

export const inject = {}
