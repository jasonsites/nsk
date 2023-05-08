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
  ignore: [
    'container.js',
    'index.js',
    'postgres/migrations/*',

    /*
      * typescript files
      * these are only necessary so that `app-container` doesn't throw errors
      * when running tests via `ts-node`
      * TODO: find a better way to handle this if possible
    */
    'container.ts',
    'index.ts',
    'http/validation/schemas/types.d.ts',
    'repo/types.d.ts',
    'types/database.d.ts',
    'types/globals.d.ts',
    'types/packages.d.ts',
  ],
})

export default container
