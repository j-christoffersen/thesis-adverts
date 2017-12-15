const bookshelf = require('../bookshelf');

require('./advertisers');

const Advert = bookshelf.Model.extend({
  tableName: 'adverts',
  advertisers() {
    return this.belongsTo('Advertiser');
  },
  likes() {
    return this.hasMany('Like');
  },
});

module.exports = bookshelf.model('Advert', Advert);
