import extend from 'lodash.assignin'

import container from '../../src/container'

export async function bootstrap() {
  // async bootstrap
}

/**
 * load modules from ioc container and assign to current context
 * @param  {Object} modules - module map
 * @return {Promise}
 */
export async function loadModules(ctx: Mocha.Context, modules: { [key: string]: string }) {
  const mods = await container.load(modules)
  extend(ctx, mods) // ignore ts error
}
