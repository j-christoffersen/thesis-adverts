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
      directory: './database/seeds',
    },
    debug: true,
  },

  test: {
    client: 'pg',
    connection: `postgres://${'postgres'}:${process.env.POSTGRES_PASSWORD}@${'postgres'}:${5432}/${'adverts'}`,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  travis: {
    client: 'pg',
    connection: `postgres://${'postgres'}:${process.env.POSTGRES_PASSWORD}@${'127.0.0.1'}:${5432}/${'adverts'}`,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
