const express = require('express');
const multer = require('multer');
const userController = require('./app/Controllers/userController');

const routes = new express.Router();

const upload = multer();

routes.get('/cadastro',userController.store);

module.exports = routes;