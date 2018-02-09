exports.seed = (knex) => {
  // db tables in order of seed
  const tables = [
    {
      name: 'advertisers',
      foreignKeys: [],
      indexes: [],
    },
    {
      name: 'adverts',
      foreignKeys: [['advertiser', 'advertisers']],
      indexes: [],
    },
    {
      name: 'categories',
      foreignKeys: [],
      indexes: [],
    },
    {
      name: 'categorizations',
      foreignKeys: [['advert', 'adverts'], ['category', 'categories']],
      indexes: ['categoryId', 'advertId'],
    },
    {
      name: 'likes',
      foreignKeys: [['advert', 'adverts']],
      indexes: ['userId'],
    },
    {
      name: 'pageCategorizations',
      foreignKeys: [['category', 'categories']],
      indexes: ['pageId'],
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

  tables.forEach((table) => {
    // drop fk constraints and indexes
    inserts.push(() => knex.schema.table(table.name, (t) => {
      table.foreignKeys.forEach((foreignKey) => {
        t.dropForeign(`${foreignKey[0]}Id`);
      });
      table.indexes.forEach((index) => {
        t.dropIndex(index);
      });
    }));

    inserts.push(() => {
      console.log(`copying ${table.name}...`);
      return knex.raw(`copy "${table.name}" from './postgres/data/${table.name}.csv'`);
    });

    // add fk back in
    inserts.push(() => knex.schema.table(table.name, (t) => {
      table.foreignKeys.forEach((foreignKey) => {
        t.foreign(`${foreignKey[0]}Id`).references(`${foreignKey[1]}.id`).onDelete('CASCADE');
      });
      table.indexes.forEach((index) => {
        t.index(index);
      });
    }));
  });

  return deletes.concat(inserts).reduce((acc, cb) => acc.then(cb), Promise.resolve());
};
