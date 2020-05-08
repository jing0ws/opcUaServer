const express = require('express');
const globalController = require('../controllers/globalController');

const routes = express.Router();

routes.get('/getInfos/:celula', globalController.getInfos);

module.exports = routes;
