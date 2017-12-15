const tape = require('tape');
const axios = require('axios');
require('dotenv').config();
const fixtures = require('../database/fixtures');

const host = `http://127.0.0.1:${process.env.PORT || 80}`;

tape('a simple test', (t) => {
  t.equal(2 + 2, 4, 'should pass');
  t.end();
});

tape('GET /', (t) => {
  axios.get(`${host}/adverts`)
    .then((res) => {
      t.equal(res.status, 200, 'should return 200 OK');
      t.end();
    })
    .catch((err) => {
      t.end(err);
    });
});

tape('GET /adverts', (t) => {
  const expected = fixtures.adverts;

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
