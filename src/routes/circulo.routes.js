const { Router } = require('express');
const CirculoController = require('../controllers/circulo/circulo.controller');
const CirculoUtiles = require('../services/Utiles');
const { circuloDataValidation } = require('../validations/circulo.validations');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const circuloRouter = Router();

circuloRouter.get('/proyectar', /* isAuthorized, */ CirculoUtiles.ProyectarMatriculas);
circuloRouter.get('/crear-copia', /* isAuthorized, */ CirculoUtiles.CirculosCopia);
circuloRouter.post('/nuevo-curso', /* isAuthorized, , isAdmin, */ CirculoUtiles.CambioDeCurso);

circuloRouter.post('/', /* isAuthorized, isAdmin, */ [circuloDataValidation], CirculoController.AddCirculo);
circuloRouter.get('/', /* [isAuthorized, isAdmin], */ CirculoController.FindAllCirculos);
circuloRouter.get('/:id', /* isAuthorized, isAdmin, */ CirculoController.FindSingleCirculo);
circuloRouter.put('/:id', /* isAuthorized, isAdmin, */ [circuloDataValidation], CirculoController.UpdateCirculo);
circuloRouter.delete('/:id', /* isAuthorized, isAdmin, */ CirculoController.DeleteCirculo);

circuloRouter.put('/status/:id',  /* isAuthorized, , isAdmin, */ CirculoUtiles.DeactivateCirculo);

module.exports = circuloRouter;


