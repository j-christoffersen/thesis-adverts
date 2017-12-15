const bookshelf = require('../bookshelf');

require('./adverts');

const Like = bookshelf.Model.extend({
  tableName: 'likes',
  adverts() {
    return this.belongsTo('Advert');
  },
});

module.exports = bookshelf.model('Like', Like);
