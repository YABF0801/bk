const { Router } = require('express');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */
const { AddSubmision } = require('../controllers/submision/submisionCreate.controller');
const { DeleteSubmision } = require('../controllers/submision/submisionDelete.controller');
const { FindAllSubmisions, FindSingleSubmisionById, FindSingleSubmisionByNumber } = require('../controllers/submision/submisionFinders.controller');
const { UpdateSubmision } = require('../controllers/submision/submisionUpdate.controller');
const { AceptarPropuesta, RechazarPropuesta, Baja } = require('../services/manageMatriculas');
const { GenerarPropuesta } = require('../services/GenerarPropuesta');

const submisionRouter = Router();

submisionRouter.post('/new/', /* isAdmin, */ AddSubmision)  /* add submision */
submisionRouter.get('/find/', /* isAuthorized, */ FindAllSubmisions)  /* find all submisions */
submisionRouter.put('/update/:id',/*  isAdmin, */ UpdateSubmision)  /* update submision */
submisionRouter.delete('/:id', /* isAdmin, */ DeleteSubmision)   /* delete submision */

// FINDERS --- REVISAR IF NEEDED
submisionRouter.get('/find/:id', /* isAdmin, */ FindSingleSubmisionById)   /* find single submision id / */
submisionRouter.get('/find/:entryNumber', /* isAuthorized, */ FindSingleSubmisionByNumber)   /* find single submision entrynumber */

// MANAGE PROPUESTAS Y MATRICULA
submisionRouter.post('/propuestas', /* isAdmin, */ GenerarPropuesta); /* generar todas las propuestas */
submisionRouter.put('/propuestas/:id', /* isAdmin,  */AceptarPropuesta) /* aceptar propuesta */
submisionRouter.put('/propuestas/:id', /* isAdmin, */ RechazarPropuesta) /* rechazar propuesta */

submisionRouter.put('/update/:id', /* isAdmin, */ Baja) /* dar baja de la matricula */

module.exports = submisionRouter;