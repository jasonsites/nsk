const path = require('path')

const config = require('config')

const { client, connection, pool, version } = config.get('postgres.options')

module.exports = {
  client,
  connection: {
    ...connection,
    port: parseInt(connection.port, 10),
  },
  migrations: {
    directory: path.join(__dirname, './database/migrations'),
    tableName: 'migrations',
  },
  pool: {
    max: parseInt(pool.max, 10),
    min: parseInt(pool.min, 10),
  },
  seeds: {
    directory: path.join(__dirname, './database/seeds'),
  },
  version,
}
