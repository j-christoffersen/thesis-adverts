Promise = require('bluebird');
const faker = require('faker');

const PAGES = 200000;
const USERS = 400000;

exports.seed = (knex) => {
  // db tables in order of seed

  const tables = [
    {
      name: 'advertisers',
      count: 1000000,
      foreignKeys: [],
      fake: () => ({ name: faker.company.companyName() }),
    },
    {
      name: 'adverts',
      count: 3000000,
      foreignKeys: [['advertiser', 'advertisers']],
      fake: () => ({
        body: faker.lorem.sentences(),
        advertiserId: faker.random.number({
          min: 1,
          max: tables.find(table => table.name === 'advertisers').count,
        }),
      }),
    },
    {
      name: 'categories',
      count: 10000,
      foreignKeys: [],
      fake: () => ({
        name: faker.random.word(),
      }),
    },
    {
      name: 'categorizations',
      count: 5000000,
      foreignKeys: [['advert', 'adverts'], ['category', 'categories']],
      fake: () => ({
        categoryId: faker.random.number({
          min: 1,
          max: tables.find(table => table.name === 'categories').count,
          // max: 10000,
        }),
        advertId: faker.random.number({
          min: 1,
          max: tables.find(table => table.name === 'adverts').count,
          // max: 4000000,
        }),
      }),
    },
    // {
    //   name: 'clicks',
    //   count: 10000000,
    // },
    {
      name: 'likes',
      count: 5000000,
      foreignKeys: [['advert', 'adverts']],
      fake: () => ({
        userId: faker.random.number({ min: 1, max: USERS }),
        advertId: faker.random.number({
          min: 1,
          max: tables.find(table => table.name === 'adverts').count,
        }),
      }),
    },
    {
      name: 'pageCategorizations',
      count: Math.floor(1.5 * PAGES),
      foreignKeys: [['category', 'categories']],
      fake: () => ({
        pageId: faker.random.number({ min: 1, max: PAGES }),
        categoryId: faker.random.number({
          min: 1,
          max: tables.find(table => table.name === 'categories').count,
        }),
      }),
    },
  ];

  const deletes = tables.map(table => (
    () => {
      console.log(`deleting from ${table.name}...`);
      return knex(table.name).del()
        .then(() => (
          knex.raw(`ALTER SEQUENCE "${table.name}_id_seq" RESTART WITH 1`)
        ));
    }
  )).reverse();

  const inserts = [];

  const rowSize = 5000;

  tables.forEach((table) => {
    // drop fk constraints
    inserts.push(() => knex.schema.table(table.name, (t) => {
      table.foreignKeys.forEach((foreignKey) => {
        t.dropForeign(`${foreignKey[0]}Id`);
      });
    }));


    let rowsInserted = 0;
    while (rowsInserted < table.count) {
      const logString = `inserting ${rowsInserted + 1} to ${rowsInserted + rowSize} into ${table.name}`;
      inserts.push(() => {
        const rows = [];
        for (let i = 0; i < rowSize; i += 1) {
          rows[i] = table.fake();
        }
        console.log(logString);
        return knex.batchInsert(table.name, rows, 1000);
      });
      rowsInserted += rowSize;
    }

    // add fk back in
    inserts.push(() => knex.schema.table(table.name, (t) => {
      table.foreignKeys.forEach((foreignKey) => {
        t.foreign(`${foreignKey[0]}Id`).references(`${foreignKey[1]}.id`).onDelete('CASCADE');
      });
    }));
  });

  return deletes.concat(inserts).reduce((acc, cb) => acc.then(cb), Promise.resolve());
  // return knex.batchInsert('advertisers', [tables[0].fake()], 1);
};
