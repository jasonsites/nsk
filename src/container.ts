/**
 * @file container.ts
 * @overview dependency injection container
 */

import Container from 'app-container'

const container = new Container({
  namespace: 'inject',
  defaults: { singleton: true },
})

container.glob('**/*.+(js|ts)', {
  cwd: __dirname,
  ignore: ['container.js', 'index.js', 'postgres/migrations/*'],
})

export default container
