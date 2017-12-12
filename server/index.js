const express = require('express');
require('dotenv').config();

const app = express();

app.route('/')
  .get((req, res) => {
    res.send('sah, world');
  });

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});