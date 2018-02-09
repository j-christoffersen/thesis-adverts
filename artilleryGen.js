module.exports = {
  randomUser: (userContext, events, done) => {
    userContext.vars.id = Math.ceil(Math.random() * 2000);
    done();
  },
};
