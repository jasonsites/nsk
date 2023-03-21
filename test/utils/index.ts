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
export async function loadModules(modules) {
  const mods = await container.load(modules)
  extend(this, mods)
}
