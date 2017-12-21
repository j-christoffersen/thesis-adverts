const bookshelf = require('../bookshelf');

require('./advertisers');
require('./likes');
require('./clicks');

const axios = require('axios');
require('../../server/mock');

const Advert = bookshelf.Model.extend({
  tableName: 'adverts',
  advertisers() {
    return this.belongsTo('Advertiser', 'advertiserId');
  },
  likes() {
    return this.hasMany('Like', 'advertId');
  },
  clicks() {
    return this.hasMany('Click', 'advertId');
  },
});

module.exports = Object.assign(bookshelf.model('Advert', Advert), {
  recommended(userId) {
    return axios.get(`/content/users/${userId}/page_likes`)
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
          .where('likes.userId', '=', userId);

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
          .orderBy('sum', 'desc')

          // for newrelic
          .then(x => Promise.resolve(x));
      });
  },
});
