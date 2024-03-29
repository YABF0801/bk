const { Router } = require('express');
const ManagePropuestas = require('../services/manageMatriculas');
const { GenerarPropuestas } = require('../services/GenerarPropuesta');
const PropuestasUtiles = require('../services/Utiles');
const isAdmin = require('../middlewares/isAdmin');
const isAuthorized = require('../middlewares/isAuthorized');

const propuestaRouter = Router();


propuestaRouter.get('/get-tools', isAuthorized, isAdmin, PropuestasUtiles.GetTools); /* Obtener el valoor aactual del consecutivo */


// MANAGE PROPUESTAS  
propuestaRouter.post('/generar', isAuthorized, isAdmin, GenerarPropuestas); /* generar todas las propuestas */
propuestaRouter.put('/aceptar', isAuthorized, isAdmin, ManagePropuestas.AceptarPropuestas); // aceptar propuestas 
propuestaRouter.put('/rechazar', isAuthorized, isAdmin, ManagePropuestas.RechazarPropuesta); /* rechazar propuestas */

propuestaRouter.post('/date', isAuthorized, isAdmin, PropuestasUtiles.AddOmDate); /* añadir fecha para el otorgamiento */
propuestaRouter.put('/date', isAuthorized, isAdmin, PropuestasUtiles.ResetOmDate); /* resetear fecha del otorgamiento */
propuestaRouter.put('/set-counter', isAuthorized, isAdmin, PropuestasUtiles.setContadorGP); /* setear contador de generar propuestas */
propuestaRouter.put('/curso-counter', isAuthorized, isAdmin, PropuestasUtiles.setContadorCC); /* setear contador de cambio ded curso */
propuestaRouter.put('/acept-counter', isAuthorized, isAdmin, PropuestasUtiles.setContadorAcept); /* setear contador de aaceptar propuestas */
propuestaRouter.put('/reset-counter', isAuthorized, isAdmin, PropuestasUtiles.ResetContadores); /* resetear contador de generar propuestas */
propuestaRouter.put('/reset-arrays', isAuthorized, isAdmin, PropuestasUtiles.ResetPropuestasArrays); /* resetear contador de generar propuestas */
propuestaRouter.get('/get-tools', isAuthorized, isAdmin, PropuestasUtiles.GetTools); /* Obtener el valoor aactual del consecutivo */




module.exports = propuestaRouter;
