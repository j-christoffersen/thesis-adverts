const bookshelf = require('../bookshelf');

require('./advertisers');
require('./likes');

const Advert = bookshelf.Model.extend({
  tableName: 'adverts',
  advertisers() {
    return this.belongsTo('Advertiser', 'advertiserId');
  },
  likes() {
    return this.hasMany('Like', 'advertId');
  },
});

module.exports = bookshelf.model('Advert', Advert);
