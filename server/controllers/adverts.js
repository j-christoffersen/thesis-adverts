const model = require('../../database/models');

module.exports = {
  read: (req, res) => {
    model.Advert.fetchAll()
      .then((adverts) => {
        res.send(JSON.stringify(adverts));
      });
  },
};
