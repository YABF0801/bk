const { Router } = require('express');
const CirculoController = require('../controllers/circulo/circulo.controller');
const CirculoUtiles = require('../services/Utiles');
const { circuloDataValidation } = require('../validations/circulo.validations');
const isAdmin = require('../middlewares/isAdmin');
const isAuthorized = require('../middlewares/isAuthorized');

const circuloRouter = Router();


circuloRouter.get('/proyectar', isAuthorized, CirculoUtiles.ProyectarMatriculas);
circuloRouter.get('/crear-copia', isAuthorized, CirculoUtiles.CirculosCopia);
circuloRouter.put('/set-curso', isAuthorized, isAdmin, CirculoUtiles.AddCurso);
circuloRouter.post('/nuevo-curso', isAuthorized, isAdmin, CirculoUtiles.NewCurso);

// Past circulos 
circuloRouter.get('/historic', [isAuthorized], CirculoController.FindPastCirculos);

// CRUD
circuloRouter.post('/', isAuthorized, isAdmin, [circuloDataValidation], CirculoController.AddCirculo);
circuloRouter.get('/', isAuthorized, CirculoController.FindAllCirculos);
circuloRouter.get('/:id', isAuthorized, CirculoController.FindSingleCirculo);
circuloRouter.put('/:id', isAuthorized, isAdmin, [circuloDataValidation], CirculoController.UpdateCirculo);
circuloRouter.delete('/:id', isAuthorized, isAdmin, CirculoController.DeleteCirculo);

circuloRouter.put('/status/:id', isAuthorized, isAdmin, CirculoUtiles.DeactivateCirculo);

module.exports = circuloRouter;


