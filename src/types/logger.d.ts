/**
 * @file logger type definitions
 */

import Logger, { LogLevel } from 'bunyan'

type CustomLoggerFields = {
  enabled?: boolean
}

export type LoggerConfiguration = {
  enabled: boolean
  label?: string
  level: LogLevel | undefined
}

export type ScopedLogger = Logger & CustomLoggerFields
