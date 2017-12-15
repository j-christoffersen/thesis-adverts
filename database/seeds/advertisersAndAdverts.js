const fixtures = require('../fixtures');

exports.seed = (knex) => {
  // db tables in order of seed
  const tables = [
    'advertisers',
    'adverts',
    'categories',
    'categorizations',
    'clicks',
    'likes',
    'pageCategorizations',
  ];

  const deletes = tables.map(table => knex(table).del()).reverse();
  const inserts = [];
  tables.forEach((table) => {
    if (table in fixtures) {
      inserts.push(knex(table).insert(fixtures[table]));
    }
  });

  return deletes.concat(inserts).reduce((acc, val) => acc.then(() => val));
};
