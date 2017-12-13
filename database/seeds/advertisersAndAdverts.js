
exports.seed = knex => (

  knex('adverts').del()
    .then(() => (
      knex('advertisers').del()
    ))
    .then(() => (
      knex('advertisers').insert([
        { id: 1, name: 'coke' },
        { id: 2, name: 'pepsi' },
        { id: 3, name: 'rc' },
      ])
    ))
    .then(() => (
      knex('adverts').insert([
        { id: 1, body: 'hey! buy some coke!', advertiserId: 1 },
        { id: 2, body: 'what\'s up everyone why don\'t you buy some pepsi', advertiserId: 2 },
        { id: 3, body: 'screw pepsi way coke is better', advertiserId: 1 },
        { id: 4, body: 'RC COLA UP IN THIS B', advertiserId: 3 },
        {
          id: 5,
          body:
          `Hey do you want to save the world while looking on fleek fellow millenials?
well in that case why don't you hoverboard on down to your local grocery and buy a case of Pepsi.
SWAG!`,
          advertiserId: 2,
        },
      ])
    ))
);
