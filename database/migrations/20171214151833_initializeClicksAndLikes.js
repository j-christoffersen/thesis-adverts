exports.up = knex => (
  knex.schema
    .createTable('clicks', (table) => {
      table.increments('id').primary();
      table.integer('advertId').references('adverts.id').onDelete('CASCADE');
      table.integer('userId');
    })
    .createTable('likes', (table) => {
      table.increments('id').primary();
      table.integer('advertId').references('adverts.id').onDelete('CASCADE');
      table.integer('userId');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('likes')
    .dropTable('clicks')
);
