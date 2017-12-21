const knexFile = require('../knexfile.js');
module.exports = require('knex')(knexFile[process.env.NODE_ENV || 'development']);
