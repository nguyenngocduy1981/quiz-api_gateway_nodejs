const _ = require('lodash');
module.exports.createErrorResult = function (errors) {
  let errorList = errors;
  if (!_.isArray(errors)) {
    errorList = [errors];
  }
  return {
    hasErrors: true,
    errors: errorList
  };
};
module.exports.createOkResult = function (
  data,
  sysCode,
  sysMessage,
  sysDescription
) {
  return {
    data: data,
    sysCode: sysCode,
    sysMessage,
    sysDescription
  };
};
