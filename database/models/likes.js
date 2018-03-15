const bookshelf = require('../bookshelf');

require('./adverts');

const Like = bookshelf.Model.extend({
  tableName: 'likes',
  adverts() {
    return this.belongsTo('Advert', 'advertId');
  },
});

module.exports = Object.assign(bookshelf.model('Like', Like), {
  create: (like) => {
    console.log('hello');
    return bookshelf.knex('likes').insert(like);
  },
});
