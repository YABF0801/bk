const { Router } = require('express');

const SumisionController = require('../controllers/submision/submision.controller');
const { AceptarPropuesta, RechazarPropuesta, Baja } = require('../services/manageMatriculas');
const { GenerarPropuesta } = require('../services/GenerarPropuesta');
const { submisionDataValidation } = require('../validations/submision.validations');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const submisionRouter = Router();

submisionRouter.post('/', /* isAuthorized, isAdmin, */ [submisionDataValidation], SumisionController.AddSubmision);
submisionRouter.get('/', /* isAuthorized, */ SumisionController.FindAllSubmisions);
submisionRouter.get('/:id', /* isAuthorized,  isAdmin, */ SumisionController.FindSingleSubmision); 
submisionRouter.put('/:id', /* isAuthorized,  isAdmin, */ [submisionDataValidation], SumisionController.UpdateSubmision);
submisionRouter.delete('/:id', /* isAuthorized,  isAdmin, */ SumisionController.DeleteSubmision);


// MANAGE PROPUESTAS Y MATRICULA
submisionRouter.post('/propuestas', /* isAuthorized,  isAdmin, */ GenerarPropuesta); /* generar todas las propuestas */
submisionRouter.put('/propuestas/:id', /* isAuthorized,  isAdmin,  */ AceptarPropuesta); /* aceptar propuesta */
submisionRouter.put('/propuestas/:id', /* isAuthorized,  isAdmin, */ RechazarPropuesta); /* rechazar propuesta */

submisionRouter.put('/:id', /* isAuthorized,  isAdmin, */ Baja); /* dar baja de la matricula */

module.exports = submisionRouter;
