// const OK = 200;
// const CREATED = 201;
// const RESOURCE_NOT_FOUND = 404;
// const INTERNAL_SERVER_ERROR = 500;

const HttpStatus = require('http-status');

/**
 * Make express response to 
 * @param {object} res express res object
 * @param {number} code request status code
 * @param {*} data response of request 
 * @param {object?} systemMetadata systemmetada, contain sysCode, sysMessage,sysDescription
 */
function createResponse (res, code, data, systemMetadata) {
  var responseTemplate = {
    systemCode: systemMetadata != null ? systemMetadata.sysCode : undefined,
    systemMessage:
      systemMetadata != null ? systemMetadata.sysMessage : undefined,
    systemDescription:
      systemMetadata != null ? systemMetadata.sysDescription : undefined,
    result: data
  };
  return res.status(code).json(responseTemplate);
}
module.exports.sendOk = function (res, data, systemMetadata) {
  createResponse(res, HttpStatus.OK, data, systemMetadata);
};
/**
 * Send resource not found response
 * @param {object} res express res object
 * @param {object} systemMetadata system metadata
 */
module.exports.sendResourceNotFound = function (res, systemMetadata) {
  createResponse(res, HttpStatus.NOT_FOUND, systemMetadata);
};
/**
 * Send internal error response
 * @param {object} res express res object
 * @param {object} systemMetadata system metadata
 */
module.exports.sendInternalServerError = function (res, systemMetadata) {
  createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, systemMetadata);
};

/**
 * Send bad request error response
 * @param {object} res express res object
 * @param {object} systemMetadata system metadata
 */
module.exports.sendBadRequestError = function (res, systemMetadata) {
  createResponse(res, HttpStatus.BAD_REQUEST, systemMetadata);
};

/**
 * Send unauthenticated response
 * @param {object} res express res object
 * @param {object} systemMetadata system metadata
 */
module.exports.sendAuthorizedError = function (res, systemMetadata) {
  createResponse(res, HttpStatus.UNAUTHORIZED, systemMetadata);
};
