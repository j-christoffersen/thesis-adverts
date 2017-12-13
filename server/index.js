const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const controller = require('./controllers');

const service = express();

service.use(bodyParser.json());

service.route('/')
  .get((req, res) => {
    res.send('sah, world');
  });

service.route('/adverts')
  .get(controller.Advert.read);

const port = process.env.PORT || 80;

service.listen(port, () => {
  console.log(`listening on port ${port}`);
});
