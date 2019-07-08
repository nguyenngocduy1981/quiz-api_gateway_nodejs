const sessionApi = require('./api/gateway');

module.exports = function () {
  return {
    '/api': sessionApi(),
  };
};
