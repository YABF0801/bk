const { Router } = require('express');
const CirculoController = require('../controllers/circulo/circulo.controller');
const { circuloDataValidation } = require('../validations/circulo.validations');
const CirculoUtiles = require('../services/Utiles');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const circuloRouter = Router();

circuloRouter.post('/', /* isAuthorized, isAdmin, */ [circuloDataValidation], CirculoController.AddCirculo);
circuloRouter.get('/', /* [isAuthorized, isAdmin], */ CirculoController.FindAllCirculos);
circuloRouter.get('/:id', /* isAuthorized, isAdmin, */ CirculoController.FindSingleCirculo);
circuloRouter.put('/:id', /* isAuthorized, isAdmin, */ [circuloDataValidation], CirculoController.UpdateCirculo);
circuloRouter.delete('/:id', /* isAuthorized, isAdmin, */ CirculoController.DeleteCirculo);

circuloRouter.get('/', /* isAuthorized, */ CirculoUtiles.ProyectarMatriculas);
circuloRouter.post('/', /* isAuthorized, , isAdmin, */ CirculoUtiles.CambioDeCurso);

module.exports = circuloRouter;
