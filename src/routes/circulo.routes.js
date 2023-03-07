const { Router } = require('express');
const {
  AddCirculo,
  FindAllCirculos,
  FindSingleCirculoById,
  FindSingleCirculoByName,
  UpdateCirculo,
  DeleteCirculo,
} = require('../controllers/circulo/circulo.controller');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const circuloRouter = Router();

circuloRouter.post('/new/', /* isAuthorized, isAdmin, */ AddCirculo);
circuloRouter.get('/find/', /* isAuthorized, */ FindAllCirculos);
circuloRouter.get('/find/:id', /* isAuthorized, isAdmin, */ FindSingleCirculoById);
circuloRouter.get('/find/:name', /* isAuthorized,  */ FindSingleCirculoByName); /* find single circulo name */
circuloRouter.put('/update/:id', /* isAuthorized, isAdmin, */ UpdateCirculo);
circuloRouter.delete('/:id', /* isAuthorized, isAdmin, */ DeleteCirculo);

module.exports = circuloRouter;
