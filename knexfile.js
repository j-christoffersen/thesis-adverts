require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'adverts',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds/dummy',
    },
    debug: true,
  },

  // dev server with docker services
  'dev-docker': {
    client: 'pg',
    connection: `postgres://${'postgres'}:${process.env.POSTGRES_PASSWORD}@${'127.0.0.1'}:${5433}/${'adverts'}`,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds/load',
    },
  },

  // dev server with adverts-load db
  'dev-load': {
    client: 'pg',
    connection: {
      database: 'adverts_load',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds/load',
    },
    debug: true,
  },

  docker: {
    client: 'pg',
    connection: `postgres://${'postgres'}:${process.env.POSTGRES_PASSWORD}@${'postgres'}:${5432}/${process.env.POSTGRES_DB || 'adverts'}`,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds/load',
    },
  },

  'prod-load': {
    client: 'pg',
    connection: `postgres://${'postgres'}:${process.env.POSTGRES_PASSWORD}@${'13.56.191.61'}:${5432}/${'adverts'}`,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds/load',
    },
  },
};
