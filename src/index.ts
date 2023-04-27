/**
 * @file index.ts
 * @overview application entrypoint
 */

import container from './container'

if (process.argv[2] === 'migrate') container.load('postgres/migrator')
else container.load('http/app')
