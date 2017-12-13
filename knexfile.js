// Update with your config settings.
require('dotenv').config();

module.exports = {

  client: 'postgresql',
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

};
