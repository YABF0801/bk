const { Router } = require('express');
const ManagePropuestas = require('../services/manageMatriculas');
const { GenerarPropuestas } = require('../services/GenerarPropuesta');
const PropuestasUtiles = require('../services/Utiles');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const propuestaRouter = Router();

// MANAGE PROPUESTAS  
propuestaRouter.post('/', /* isAuthorized,  isAdmin, */ GenerarPropuestas); /* generar todas las propuestas */
propuestaRouter.put('/', /* isAuthorized,  isAdmin,  */ ManagePropuestas.AceptarPropuestas); /* aceptar propuestas */
propuestaRouter.put('/', /* isAuthorized,  isAdmin, */ ManagePropuestas.RechazarPropuesta); /* rechazar propuestas */

propuestaRouter.post('/date', /* isAuthorized,  isAdmin, */ PropuestasUtiles.AddOmDate); /* añadir fecha para el otorgamiento */
propuestaRouter.put('/date', /* isAuthorized,  isAdmin, */ PropuestasUtiles.ResetOmDate); /* resetear fecha del otorgamiento */
propuestaRouter.put('/counter', /* isAuthorized,  isAdmin, */ PropuestasUtiles.ResetContadorGP); /* resetear contador de generar propuestas */

module.exports = propuestaRouter;
