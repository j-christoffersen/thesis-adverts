const axios = require('axios');
const Mock = require('axios-mock-adapter');
const faker = require('faker');

const mock = new Mock(axios);

if (process.env.NODE_ENV === 'dev-load') {
  mock.onGet(/\/content\/users\/.+\/page_likes/).reply(() => (
    [
      200,
      [
        { pageId: 1 },
        { pageId: 2 },
      ],
      // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      //   .map(() => ({ pageId: faker.random.number({ min: 1, max: 200000 }) })),
    ]
  ));
} else {
  mock.onGet(/\/content\/users\/.+\/page_likes/).reply(200, [
    { pageId: 1 },
    { pageId: 2 },
  ]);
}

module.exports = mock;
