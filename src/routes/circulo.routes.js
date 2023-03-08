const { Router } = require('express');
const {
  AddCirculo,
  FindAllCirculos,
  FindSingleCirculo,
  UpdateCirculo,
  DeleteCirculo,
} = require('../controllers/circulo/circulo.controller');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const circuloRouter = Router();

circuloRouter.post('/', /* isAuthorized, isAdmin, */ AddCirculo);
circuloRouter.get('/', /* isAuthorized, */ FindAllCirculos);
circuloRouter.get('/:id', /* isAuthorized, isAdmin, */ FindSingleCirculo);
circuloRouter.put('/:id', /* isAuthorized, isAdmin, */ UpdateCirculo);
circuloRouter.delete('/:id', /* isAuthorized, isAdmin, */ DeleteCirculo);

module.exports = circuloRouter;
