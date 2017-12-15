const model = require('../../database/models');

module.exports = {
  create: (req, res) => {
    new model.Like({ advertId: req.params.id, userId: req.query.userId }).save()
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
