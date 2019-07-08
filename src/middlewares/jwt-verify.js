module.exports = function (req, res, next) {
  console.log('A request at: ', new Date());
  // TODO If security is applied, this is where security must be checked
  next();
};
