const sessionService = require('../service/gateway-service');
const response = require('../util/response');
const jwtVerify = require('../middlewares/jwt-verify');
const express = require('express');
const routes = express.Router();

function getRoutes() {
  routes.use(jwtVerify);
  routes.get('/list', listExams);
  routes.get('/list/', listExams);
  routes.get('/:name', getExam);
  routes.post('/:name', saveExamResult);

  return routes;
}

module.exports = getRoutes;

function listExams(req, res) {
  sessionService.findAll().then((result) => {
    response.sendOk(res, result);
  }).catch((err) => {
    response.sendBadRequestError(res, err);
  });
}

function getExam(req, res) {
  const {name} = req.params;
  sessionService.findByName(name).then((result) => {
    response.sendOk(res, result);
  }).catch((err) => {
    response.sendBadRequestError(res, err);
  });
}

function saveExamResult(req, res) {
  const {name} = req.params;
  sessionService.saveExamResult(name, req.body).then((result) => {
    response.sendOk(res, result);
  }).catch((err) => {
    response.sendBadRequestError(res, err);
  });
}
