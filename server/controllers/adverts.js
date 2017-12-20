const bookshelf = require('../../database/bookshelf');
const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const axios = require('axios');
require('../mock');

const redisClient = redis.createClient();

const JsonHeaders = { 'Content-Type': 'application/json' };

module.exports = {
  read: (req, res) => {
    redisClient.getAsync(req.query.userId)
      .then((adverts) => {
        if (adverts) {
          res.set(JsonHeaders).send(adverts);
        } else {
          axios.get(`/content/users/${req.query.userId}/page_likes`)
            .then((response) => {
              const pageLikes = response.data.map(obj => obj.pageId);

              const pageLikeCategories = bookshelf.knex
                .select('categoryId')
                .from('pageCategorizations')
                .whereIn('pageId', pageLikes);

              const advertLikeCategories = bookshelf.knex
                .select('categoryId')
                .from('likes')
                .join('categorizations', { 'categorizations.advertId': 'likes.advertId' })
                .where('likes.userId', '=', req.query.userId);

              const totalCategories = pageLikeCategories
                .unionAll(advertLikeCategories)
                .as('totalCategories');

              const userWeights = bookshelf.knex
                .select('categoryId')
                .count('*')
                .from(totalCategories)
                .groupBy('categoryId')
                .as('userWeights');

              const advertWeights = bookshelf.knex
                .select('advertId')
                .sum('userWeights.count')
                .limit(10)
                .from('categorizations')
                .join(userWeights, { 'userWeights.categoryId': 'categorizations.categoryId' })
                .groupBy('advertId')
                .as('advertWeights')
                .orderBy('sum', 'desc');

              return bookshelf.knex
                .select('adverts.id', 'adverts.body', 'advertisers.name as advertiserName')
                .from('adverts')
                .join(advertWeights, { 'adverts.id': 'advertId' })
                .join('advertisers', { 'advertisers.id': 'adverts.advertiserId' })

                .then((result) => {
                  const resultJson = JSON.stringify(result);
                  res.set(JsonHeaders).send(resultJson);
                  redisClient.setAsync(req.query.userId, resultJson, 'EX', 20);
                });
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      });
  },
};
