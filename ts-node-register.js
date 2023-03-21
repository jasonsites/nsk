/**
 * For tests: overrides the tsconfig used for the app
 */

/* eslint-disable */
const tsNode = require('ts-node')
const tsConfigPaths = require('tsconfig-paths')
const TSConfigPaths = require('./tsconfig.build.json').compilerOptions.paths
const TestTSConfigPaths = require('./tsconfig.json').compilerOptions.paths

tsConfigPaths.register({
  baseUrl: '.',
  paths: { ...TSConfigPaths, ...TestTSConfigPaths },
})

tsNode.register({
  files: true,
  transpileOnly: true,
  project: './tsconfig.json',
})
