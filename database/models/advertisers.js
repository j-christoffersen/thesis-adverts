const bookshelf = require('../bookshelf');

require('./adverts');

const Advertiser = bookshelf.Model.extend({
  tableName: 'advertisers',
  adverts() {
    return this.belongsTo('Advert');
  },
});

module.exports = bookshelf.model('Advertiser', Advertiser);
