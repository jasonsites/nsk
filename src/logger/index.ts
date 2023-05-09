/**
 * @file (base) application logger
 */

import Logger, { LoggerOptions, createLogger } from 'bunyan'
import config from 'config'

import type { LoggerConfiguration } from '../types/logger'

const {
  npm_package_name: name = 'unknown',
  npm_package_version: version = 'unknown',
} = process.env

export default function logger(): Logger {
  const { level }: LoggerConfiguration = config.get('logger.app')
  const metadata: LoggerOptions = { level, name, version }
  return createLogger(metadata)
}

export const inject = {
  name: 'logger',
}
