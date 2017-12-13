
exports.up = knex => (
  knex.schema
    .createTable('advertisers', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('adverts', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.integer('advertiserId').unique().references('advertisers.id');
    })
);

exports.down = knex => (
  knex.schema
    .dropTable('advers')
    .dropTable('advertisers')
);
