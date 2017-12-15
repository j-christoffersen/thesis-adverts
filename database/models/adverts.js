const bookshelf = require('../bookshelf');

require('./advertisers');
require('./likes');
require('./clicks');

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

module.exports = bookshelf.model('Advert', Advert);
