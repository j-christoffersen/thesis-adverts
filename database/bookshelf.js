const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'adverts',
    charset: 'utf8',
  },
});

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
module.exports = bookshelf;
