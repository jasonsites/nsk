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
  ignore: ['container.js', 'container.ts', 'index.js', 'index.ts'],
})

export default container
