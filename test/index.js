const tape = require('tape');
const axios = require('axios');

const host = 'http://127.0.0.1';

tape('a simple test', (t) => {
  t.equal(2 + 2, 4, 'should pass');
  t.end();
});

tape('GET /', (t) => {
  axios.get('/')
    .then((res) => {
      t.equal(res.status, 200, 'should return 200 OK');
      t.end();
    })
    .catch((err) => {
      t.end(err);
    });
});

tape('GET /adverts', (t) => {
  const expected = [
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
  ];

  axios.get(`${host}/adverts`)
    .then((res) => {
      t.equal(res.status, 200, 'should return 200 OK');
      t.deepEqual(res.data, expected, 'should return all adverts');
      t.end();
    })
    .catch((err) => {
      t.end(err);
    });
});
