const express = require('express');
const multer = require('multer');
const userController = require('./app/Controllers/userController');

const routes = new express.Router();

const upload = multer();

routes.get('/',userController.index);
routes.get('/cadastro',userController.indexCadastro);
routes.post('/cadastro',userController.cadastrar);
routes.get('/info/:id',userController.indexUpdate);
routes.post('/info/:id',userController.update);
routes.post('/info/senha/:id',userController.updateSenha);
routes.post('/info/esqueceu/senha/:id',userController.updateSenha);
routes.post('/info/delete/:id',userController.delete);

module.exports = routes;