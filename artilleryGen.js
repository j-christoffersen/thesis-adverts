const USERS = 400000;
const ADS = 3000000;

module.exports = {
  randomUser: (userContext, events, done) => {
    userContext.vars.id = Math.floor(Math.random() * USERS) + 1;
    userContext.vars.advertId = Math.floor(Math.random() * ADS) + 1;
    done();
  },
};
