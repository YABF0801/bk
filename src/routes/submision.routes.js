const { Router } = require('express');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */
const { AddSubmision, FindAllSubmisions, FindSingleSubmision, UpdateSubmision, DeleteSubmision } = require('../controllers/submision/submision.controller');
const { AceptarPropuesta, RechazarPropuesta, Baja } = require('../services/manageMatriculas');
const { GenerarPropuesta } = require('../services/GenerarPropuesta');
const {SubmisionFormValidations} = require('../validations/completeSubmision.validations');

const submisionRouter = Router();

submisionRouter.post('/', /* isAuthorized, isAdmin, */ [SubmisionFormValidations], AddSubmision);
submisionRouter.get('/', /* isAuthorized, */ FindAllSubmisions);
submisionRouter.get('/:id', /* isAuthorized,  isAdmin, */ FindSingleSubmision); 
submisionRouter.put('/:id', /* isAuthorized,  isAdmin, */ [SubmisionFormValidations], UpdateSubmision);
submisionRouter.delete('/:id', /* isAuthorized,  isAdmin, */ DeleteSubmision);


// MANAGE PROPUESTAS Y MATRICULA
submisionRouter.post('/propuestas', /* isAuthorized,  isAdmin, */ GenerarPropuesta); /* generar todas las propuestas */
submisionRouter.put('/propuestas/:id', /* isAuthorized,  isAdmin,  */ AceptarPropuesta); /* aceptar propuesta */
submisionRouter.put('/propuestas/:id', /* isAuthorized,  isAdmin, */ RechazarPropuesta); /* rechazar propuesta */

submisionRouter.put('/:id', /* isAuthorized,  isAdmin, */ Baja); /* dar baja de la matricula */

module.exports = submisionRouter;
