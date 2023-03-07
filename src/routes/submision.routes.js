const { Router } = require('express');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */
const { AddSubmision } = require('../controllers/submision/submisionCreate.controller');
const { DeleteSubmision } = require('../controllers/submision/submisionDelete.controller');
const {
  FindAllSubmisions,
  FindSingleSubmisionById,
  FindSingleSubmisionByNumber,
} = require('../controllers/submision/submisionFinders.controller');
const { UpdateSubmision } = require('../controllers/submision/submisionUpdate.controller');
const { AceptarPropuesta, RechazarPropuesta, Baja } = require('../services/manageMatriculas');
const { GenerarPropuesta } = require('../services/GenerarPropuesta');

const submisionRouter = Router();

submisionRouter.post('/new/', /* isAuthorized, isAdmin, */ AddSubmision);
submisionRouter.get('/find/', /* isAuthorized, */ FindAllSubmisions);
submisionRouter.put('/update/:id', /* isAuthorized,  isAdmin, */ UpdateSubmision);
submisionRouter.delete('/:id', /* isAuthorized,  isAdmin, */ DeleteSubmision);

// FINDERS --- REVISAR IF NEEDED
submisionRouter.get(
  '/find/:id',
  /* isAuthorized,  isAdmin, */ FindSingleSubmisionById
); /* find single submision id / */
submisionRouter.get(
  '/find/:entryNumber',
  /* isAuthorized, */ FindSingleSubmisionByNumber
); /* find single submision entrynumber */

// MANAGE PROPUESTAS Y MATRICULA
submisionRouter.post('/propuestas', /* isAuthorized,  isAdmin, */ GenerarPropuesta); /* generar todas las propuestas */
submisionRouter.put('/propuestas/:id', /* isAuthorized,  isAdmin,  */ AceptarPropuesta); /* aceptar propuesta */
submisionRouter.put('/propuestas/:id', /* isAuthorized,  isAdmin, */ RechazarPropuesta); /* rechazar propuesta */

submisionRouter.put('/update/:id', /* isAuthorized,  isAdmin, */ Baja); /* dar baja de la matricula */

module.exports = submisionRouter;
