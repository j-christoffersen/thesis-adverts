exports.up = knex => (
  knex.schema
    .createTable('advertisers', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('adverts', (table) => {
      table.increments('id').primary();
      table.text('body');
      table.integer('advertiserId').references('advertisers.id').onDelete('CASCADE');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('adverts')
    .dropTable('advertisers')
);
