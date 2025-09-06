// server/db/config.cjs
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.NUXT_DB_USER || 'postgres',
    password: process.env.NUXT_DB_PASSWORD || 'umair8920',
    database: process.env.NUXT_DB_NAME || 'portfolio_db',
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.NUXT_DB_USER || 'postgres',
    password: process.env.NUXT_DB_PASSWORD || 'umair8920',
    database: (process.env.NUXT_DB_NAME || 'portfolio_db') + '_test',
    host: process.env.NUXT_DB_HOST || '127.0.0.1',
    port: Number(process.env.NUXT_DB_PORT) || 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.NUXT_DB_USER,
    password: process.env.NUXT_DB_PASSWORD,
    database: process.env.NUXT_DB_NAME,
    host: process.env.NUXT_DB_HOST,
    port: Number(process.env.NUXT_DB_PORT) || 5432,
    dialect: 'postgres'
  }
};
