/**
 * @file api/example.ts
 * @overview example service client
 * NOTE: this module (dir and filename) should be renamed to reflect the actual service client
 */

import axios from 'axios'
import config from 'config'

export default function service() {
  type ExampleApiOptions = {
    baseURL: string,
    timeout: number,
  }

  const options: ExampleApiOptions = config.get('services.example.api')
  const client = axios.create(options)

  return { client }
}

export const inject = {}
