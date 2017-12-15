Promise = require('bluebird');
const tape = require('tape');
const axios = require('axios');
require('dotenv').config();
const fixtures = require('../database/fixtures');

const host = `http://127.0.0.1:${process.env.PORT || 80}`;

const model = require('../database/models');

tape('GET /', (t) => {
  axios.get(`${host}/`)
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

tape('POST /adverts/:id/likes', (t) => {
  axios.post(`${host}/adverts/5/likes?userId=5`)
    .then((res) => {
      t.equal(res.status, 201, 'should return 201 created');
      return new model.Advert({ id: 5 }).like().fetchOne().query({ where: { userId: 5 } })
        .then((like) => {
          t.ok(like, 'should create a like in the db');
        });
    })
    .catch((err) => {
      t.fail(err);
    })
    .finally(() => {
      t.end();
    });
});

tape('POST /adverts/:id/clicks', (t) => {
  axios.post(`${host}/adverts/5/clicks?userId=5`)
    .then((res) => {
      t.equal(res.status, 201, 'should return 201 created');
      return new model.Advert({ id: 5 }).click().fetchOne().query({ where: { userId: 5 } })
        .then((like) => {
          t.ok(like, 'should create a click in the db');
        });
    })
    .catch((err) => {
      t.fail(err);
    })
    .finally(() => {
      t.end();
    });
});
