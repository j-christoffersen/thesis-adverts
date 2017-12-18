Promise = require('bluebird');

exports.up = knex => (
  Promise.all([
    knex.schema.alterTable('pageCategorizations', (table) => {
      table.index('pageId');
    }),
    knex.schema.alterTable('categorizations', (table) => {
      table.index('advertId');
      table.index('categoryId');
    }),
    knex.schema.alterTable('likes', (table) => {
      table.index('userId');
    }),
  ])
);

exports.down = knex => (
  Promise.all([
    knex.schema.alterTable('pageCategorizations', (table) => {
      table.dropIndex('pageId');
    }),
    knex.schema.alterTable('categorizations', (table) => {
      table.dropIndex('advertId');
      table.dropIndex('categoryId');
    }),
    knex.schema.alterTable('likes', (table) => {
      table.dropIndex('userId');
    }),
  ])
);
