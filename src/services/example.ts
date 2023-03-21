/**
 * @file services/example.ts
 * @overview example service
 */

import config from 'config'

export default function service({ api, logger }) {
  const { enabled, label, level } = config.get('logger.services.example')

  return {
    context: (correlation) => {
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
    },
  }
}

export const inject = {
  require: {
    api: 'api/example',
    logger: 'logger',
  },
}
