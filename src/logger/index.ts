/**
 * @file logger/index.ts
 * @overview application (base) logger
 */

import { createLogger } from 'bunyan'
import config from 'config'

const { npm_package_name: name, npm_package_version: version } = process.env

export default function logger() {
  const { level } = config.get('logger.app')
  return createLogger({ level, name, version })
}

export const inject = {
  name: 'logger',
}
