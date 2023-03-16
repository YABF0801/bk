const { Router } = require('express');
const {
  AddCirculo,
  FindAllCirculos,
  FindSingleCirculo,
  UpdateCirculo,
  DeleteCirculo,
} = require('../controllers/circulo/circulo.controller');
const isAdmin = require('../middlewares/isAdmin');
const isAuthorized = require('../middlewares/isAuthorized');
const { circuloDataValidation } = require('../validations/circulo.validations');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const circuloRouter = Router();

circuloRouter.post('/', /* isAuthorized, isAdmin, */ [circuloDataValidation], AddCirculo);
circuloRouter.get('/', [isAuthorized, isAdmin], FindAllCirculos);
circuloRouter.get('/:id', /* isAuthorized, isAdmin, */ FindSingleCirculo);
circuloRouter.put('/:id', /* isAuthorized, isAdmin, */ [circuloDataValidation], UpdateCirculo);
circuloRouter.delete('/:id', /* isAuthorized, isAdmin, */ DeleteCirculo);

module.exports = circuloRouter;
