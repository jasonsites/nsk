/**
 * @file domain/index.ts
 * @overview domain logic
 * NOTE: this module should be renamed to reflect the actual domain
 */

export default function domain({ repo, services }) {
  const { example } = services

  return {
    context: (correlation) => {
      const repository = repo.context(correlation)

      async function create({ data, type }) {
        return repository.create({ data, type })
      }

      async function destroy({ id, type }) {
        return repository.destroy({ id, type })
      }

      async function detail({ id, type }) {
        await example.context(correlation).get()
        return repository.detail({ id, type })
      }

      async function list({ filters, page, sort, type }) {
        return repository.list({ filters, page, sort, type })
      }

      async function update({ data, id, type }) {
        return repository.update({ data, id, type })
      }

      return { create, destroy, detail, list, update }
    },
  }
}

export const inject = {
  name: 'domain',
  require: {
    repo: 'repo',
    services: {
      example: 'services/example',
    },
  },
}
