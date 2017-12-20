module.exports = {
  randomUser: (userContext, events, done) => {
    userContext.vars.id = Math.ceil(Math.random() * 3000);
    done();
  },
};
