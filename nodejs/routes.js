const express = require('express');
const routes = express.Router();
const userController = require('./controller/users.controller');

routes.get('/',userController.Store);
routes.post('/login',userController.validarLogin);



module.exports = routes;