/**
 * @file logger/index.ts
 * @overview application (base) logger
 */

import Logger, { LoggerOptions, createLogger } from 'bunyan'
import config from 'config'

import type { LoggerConfiguration } from '../types/globals'

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
