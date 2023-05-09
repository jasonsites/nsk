/**
 * @file example service client
 * NOTE: this module (directory & filename) should be renamed to reflect an actual service client
 */

import axios from 'axios'
import config from 'config'

type ExampleServiceConfiguration = {
  baseURL: string
  timeout: number
}

export default function service() {
  const options: ExampleServiceConfiguration = config.get('services.example.api')
  const client = axios.create(options)

  return { client }
}

export const inject = {}
