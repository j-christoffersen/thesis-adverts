const model = require('../../database/models');
const bookshelf = require('../../database/bookshelf');

const JsonHeaders = { 'Content-Type': 'application/json' };

module.exports = {
  read: (req, res) => {
    const userWeights = bookshelf.knex
      .select('categoryId')
      .count('*')
      .from('likes')
      .join('adverts', { 'likes.advertId': 'adverts.id' })
      .where('likes.userId', '=', req.query.userId)
      .join('categorizations', { 'categorizations.advertId': 'adverts.id' })
      .groupBy('categorizations.categoryId')
      .as('userWeights');
      // result: users categoriy weights
      // EG: [{"categoryId":4,"count":"1"},{"categoryId":1,"count":"2"}]

    const advertWeights = bookshelf.knex
      .select('advertId')
      .sum('userWeights.count')
      .from('categorizations')
      .join(userWeights, { 'userWeights.categoryId': 'categorizations.categoryId' })
      .groupBy('advertId')
      .orderBy('sum', 'desc')
      .as('advertWeights');

    bookshelf.knex
      .select('adverts.id', 'adverts.body', 'advertisers.name as advertiserName')
      .from('adverts')
      .join(advertWeights, { 'adverts.id': 'advertId' })
      .join('advertisers', { 'advertisers.id': 'adverts.advertiserId' })

      .then((result) => {
        res.set(JsonHeaders).send(JSON.stringify(result));
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
