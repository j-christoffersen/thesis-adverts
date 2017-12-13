const bookshelf = require('../bookshelf');

require('./advertisers');

const Advert = bookshelf.Model.extend({
  tableName: 'adverts',
  advertisers() {
    return this.belongsTo('Advertiser');
  },
});

module.exports = bookshelf.model('Advert', Advert);
