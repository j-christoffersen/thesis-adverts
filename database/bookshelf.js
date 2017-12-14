const knexFile = require('../knexfile.js');
const knex = require('knex')(knexFile[process.env.NODE_ENV || 'development']);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');

module.exports = bookshelf;
