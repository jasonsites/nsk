/**
 * @file api/example.ts
 * @overview example service client
 * NOTE: this module (dir and filename) should be renamed to reflect the actual service client
 */

import axios from 'axios'
import config from 'config'

import type { ExampleServiceConfiguration } from '../types/globals'

export default function service() {
  const options: ExampleServiceConfiguration = config.get('services.example.api')
  const client = axios.create(options)

  return { client }
}

export const inject = {}
