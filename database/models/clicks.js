const bookshelf = require('../bookshelf');

require('./adverts');

const Click = bookshelf.Model.extend({
  tableName: 'clicks',
  adverts() {
    return this.belongsTo('Advert', 'advertId');
  },
});

module.exports = bookshelf.model('Click', Click);
