const { Router } = require('express');
const { AddCirculo, FindAllCirculos, FindSingleCirculoById, FindSingleCirculoByName, UpdateCirculo, DeleteCirculo } = require('../controllers/circulo/circulo.controller');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const circuloRouter = Router()

circuloRouter.post('/new/', /* isAdmin, */ AddCirculo)   /* add circulo */
circuloRouter.get('/find/', /* isAuthorized, */ FindAllCirculos)   /* find all circulos */
circuloRouter.get('/find/:id', /* isAdmin, */ FindSingleCirculoById)   /* find single circulo id */
circuloRouter.get('/find/:name', /* isAuthorized,  */FindSingleCirculoByName)   /* find single circulo name */
circuloRouter.put('/update/:id', /* isAdmin, */ UpdateCirculo)  /* update circulo */
circuloRouter.delete('/:id', /* isAdmin, */ DeleteCirculo)   /* delete circulo */

module.exports = circuloRouter;