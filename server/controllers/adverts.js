const bookshelf = require('../../database/bookshelf');
const axios = require('axios');
require('../mock');

const JsonHeaders = { 'Content-Type': 'application/json' };

module.exports = {
  read: (req, res) => {
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
          .from('categorizations')
          .join(userWeights, { 'userWeights.categoryId': 'categorizations.categoryId' })
          .groupBy('advertId')
          .as('advertWeights');

        bookshelf.knex
          .select('adverts.id', 'adverts.body', 'advertisers.name as advertiserName')
          .limit(10)
          .from('adverts')
          .join(advertWeights, { 'adverts.id': 'advertId' })
          .join('advertisers', { 'advertisers.id': 'adverts.advertiserId' })
          .orderBy('sum', 'desc')

          .then((result) => {
            res.set(JsonHeaders).send(JSON.stringify(result));
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
