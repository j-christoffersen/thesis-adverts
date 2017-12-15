exports.up = knex => (
  knex.schema
    .createTable('pageCategorizations', (table) => {
      table.increments('id').primary();
      table.integer('pageId');
      table.integer('categoryId').references('categories.id');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('pageCategorizations')
);
