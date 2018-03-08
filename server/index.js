require('dotenv').config();
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers');

const JsonHeaders = { 'Content-Type': 'application/json' };

const service = express();

service.use(bodyParser.json());

// //debugging
// service.use((req, res, next) => {
//   console.log(req.body);
//   next();
// })

service.route('/')
  .get((req, res) => {
    res.send('sah, world');
  });

service.use((req, res, next) => {
  res.set(JsonHeaders);
  next();
});

service.route('/adverts')
  .get(controller.Advert.read);

service.route('/adverts/:id/likes')
  .post(controller.Like.create);

service.route('/adverts/:id/clicks')
  .post(controller.Click.create);


const port = process.env.PORT || 80;

service.listen(port, () => {
  console.log(`listening on port ${port}`);
});
