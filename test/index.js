Promise = require('bluebird');
const tape = require('tape');
const axios = require('axios');
require('dotenv').config();
const fixtures = require('../database/fixtures');

const host = `http://127.0.0.1:${process.env.PORT || 80}`;

const bookshelf = require('../database/bookshelf');
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
  const expected = fixtures.adverts.map((adverts, i) => Object.assign(adverts, { id: i + 1 }));

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
  axios.post(`${host}/adverts/5/likes`, { userId: 5 })
    .then((res) => {
      t.equal(res.status, 201, 'should return 201 created');
      return new model.Advert({ id: 5 }).likes().query({ where: { userId: 5 } }).fetchOne()
        .then((like) => {
          t.ok(like, 'should create a like in the db');
          return like.destroy()
            .catch(() => {
              console.warn('data created by the test may not have been destroyed');
            });
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
  axios.post(`${host}/adverts/5/clicks`, { userId: 5 })
    .then((res) => {
      t.equal(res.status, 201, 'should return 201 created');
      return new model.Advert({ id: 5 }).clicks().query({ where: { userId: 5 } }).fetchOne()
        .then((click) => {
          t.ok(click, 'should create a click in the db');
          return click.destroy()
            .catch(() => {
              console.warn('data created by the test may not have been destroyed');
            });
        });
    })
    .catch((err) => {
      t.fail(err);
    })
    .finally(() => {
      t.end();
    });
});

tape('teardown', (t) => {
  bookshelf.knex.destroy();
  t.end();
});

