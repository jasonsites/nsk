/**
 * @file example service
 */

import config from 'config'

import type Logger from 'bunyan'
import type { AxiosInstance } from 'axios'
import type { Correlation } from '../types/correlation'
import type { LoggerConfiguration } from '../types/logger'

interface Dependencies {
  api: { client: AxiosInstance }
  logger: Logger
}

export default function service(deps: Dependencies) {
  const { api, logger } = deps
  const { enabled, label, level }: LoggerConfiguration = config.get('logger.services.example')

  const context = (correlation: Correlation) => {
    const { headers, req_id } = correlation
    const log = logger.child({ module: label, req_id, level })

    async function get() {
      try {
        const response = await api.client({ url: '/', method: 'get', headers })
        const { data } = response
        if (enabled) log.info(data)
        return data
      } catch (err) {
        log.error(err)
        throw err
      }
    }

    return { get }
  }

  return { context }
}

export const inject = {
  require: {
    api: 'api/example',
    logger: 'logger',
  },
}
