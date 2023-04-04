const { Router } = require('express');

const SubmisionController = require('../controllers/submision/submision.controller');
const SubmisionUtiles = require('../services/Utiles');
const ManageMatriculas = require('../services/manageMatriculas');
const { submisionDataValidation } = require('../validations/submision.validations');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const submisionRouter = Router();
// NUMERO CONSECUTIVO 
submisionRouter.put('/reset-consecutive', /* isAuthorized,  isAdmin, */ SubmisionUtiles.ResetConsecutive); /* Resetear el numero de entrada consecutivo */
submisionRouter.get('/get-tools', /* isAuthorized,  isAdmin, */ SubmisionUtiles.GetTools); /* Obtener el valoor aactual del consecutivo */

// CRUD
submisionRouter.post('/', /* isAuthorized, isAdmin, */ [submisionDataValidation], SubmisionController.AddSubmision);
submisionRouter.get('/', /* isAuthorized, */ SubmisionController.FindAllSubmisions);
submisionRouter.get('/:id', /* isAuthorized,  isAdmin, */ SubmisionController.FindSingleSubmision); 
submisionRouter.put('/:id', /* isAuthorized,  isAdmin, */ [submisionDataValidation], SubmisionController.UpdateSubmision);
submisionRouter.delete('/:id', /* isAuthorized,  isAdmin, */ SubmisionController.DeleteSubmision);

// MANAGE MATRICULA
submisionRouter.put('/matricular/:id', /* isAuthorized,  isAdmin, */ ManageMatriculas.MatriculaManual); /* hacer la matricula manual */
submisionRouter.put('/baja/:id', /* isAuthorized,  isAdmin, */ ManageMatriculas.Baja); /* dar baja de la matricula */





module.exports = submisionRouter;
