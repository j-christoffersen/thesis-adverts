module.exports = (userContext, events, done) => {
  userContext.vars.id = Math.ceil(Math.random() * 1000);
  done();
};
