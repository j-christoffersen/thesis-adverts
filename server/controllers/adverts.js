// const bookshelf = require('../../database/bookshelf');
// const axios = require('axios');
// require('../../server/mock');

const bluebird = require('bluebird');
const redis = require('redis');
const model = require('../../database/models');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const { redisUrl } = require('../../redisConfig.js');

const redisClient = redis.createClient(redisUrl);

module.exports = {
  read: (req, res) => {
    redisClient.getAsync(req.query.userId)
      .then((adverts) => {
        if (adverts) {
          res.send(adverts);
          // redisClient.expireAsync(req.query.userId, REDIS_EXPIRE_TIME);
        } else {
          model.Advert.recommended(req.query.userId)
            .then((result) => {
              const resultJson = JSON.stringify(result);
              res.send(resultJson);
              // redisClient.setAsync(req.query.userId, resultJson, 'EX', REDIS_EXPIRE_TIME);
              redisClient.setAsync(req.query.userId, resultJson);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      });
  },
};
