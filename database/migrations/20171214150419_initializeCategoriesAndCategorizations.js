exports.up = knex => (
  knex.schema
    .createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('categorizations', (table) => {
      table.increments('id').primary();
      table.integer('advertId').references('adverts.id').onDelete('CASCADE');
      table.integer('categoryId').references('categories.id').onDelete('CASCADE');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('categorizations')
    .dropTable('categories')
);
