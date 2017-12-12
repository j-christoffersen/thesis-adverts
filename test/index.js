const tape = require('tape');
const axios = require('axios');

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
