/**
 * @file dependency injection container
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
    'http/types.d.ts',
    'http/validation/types.d.ts',
    'repo/entities/types.d.ts',
    'repo/models/types.d.ts',
    'types/core.d.ts',
    'types/database.d.ts',
    'types/logger.d.ts',
    'types/packages.d.ts',
    'types/pagination.d.ts',
    'types/postgres.d.ts',
    'types/repository.d.ts',
    'types/services.d.ts',
  ],
})

export default container
