const model = require('../../database/models');

const JsonHeaders = { 'Content-Type': 'application/json' };

module.exports = {
  read: (req, res) => {
    model.Advert.fetchAll()
      .then((adverts) => {
        res.send(JSON.stringify(adverts));
      });
  },
};
