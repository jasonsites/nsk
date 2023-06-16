/**
 * @file (base) application logger
 */

import { createLogger } from 'bunyan'
import config from 'config'

import type Logger from 'bunyan'
import type { LoggerOptions } from 'bunyan'
import type { LoggerConfiguration } from '../types/logger'

const name = process.env.npm_package_name ?? 'unknown'
const version = process.env.npm_package_version ?? 'unknown'

export default function logger(): Logger {
  const { level }: LoggerConfiguration = config.get('logger.app')
  const metadata: LoggerOptions = { level, name, version }
  return createLogger(metadata)
}

export const inject = {
  name: 'logger',
}
