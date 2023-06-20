const { Router } = require('express');
const { enums } = require('../schemas/submision.schema');
const SubmisionController = require('../controllers/submision/submision.controller');
const SubmisionUtiles = require('../services/Utiles');
const ManageMatriculas = require('../services/manageMatriculas');
const { submisionDataValidation } = require('../validations/submision.validations');
const isAdmin = require('../middlewares/isAdmin');
const isAuthorized = require('../middlewares/isAuthorized');

const submisionRouter = Router();

// NUMERO CONSECUTIVO 
submisionRouter.put('/reset-consecutive', isAuthorized, isAdmin, SubmisionUtiles.ResetConsecutive); /* Resetear el numero de entrada consecutivo */
submisionRouter.get('/get-tools', isAuthorized,  isAdmin,  SubmisionUtiles.GetTools); /* Obtener el valor actual del consecutivo */

// enums
submisionRouter.get('/enums', isAuthorized, (req, res) => {res.json(enums)});

// CONSEJOS POPULARES 
submisionRouter.get('/consejos-p', isAuthorized,  isAdmin,  SubmisionUtiles.GetConsejos); 
submisionRouter.post('/consejo', isAuthorized,  isAdmin,  SubmisionUtiles.AddConsejo);

// CRUD
submisionRouter.post('/', isAuthorized, isAdmin, [submisionDataValidation], SubmisionController.AddSubmision);
submisionRouter.get('/', isAuthorized, SubmisionController.FindAllSubmisions);
submisionRouter.get('/:id', isAuthorized, isAdmin, SubmisionController.FindSingleSubmision);
submisionRouter.put('/:id', isAuthorized, isAdmin, [submisionDataValidation], SubmisionController.UpdateSubmision);
submisionRouter.delete('/:id', isAuthorized, isAdmin, SubmisionController.DeleteSubmision);

// MANAGE MATRICULA
submisionRouter.put('/matricular/:id', isAuthorized, isAdmin, ManageMatriculas.MatriculaManual); /* hacer la matricula manual */
submisionRouter.put('/baja/:id', isAuthorized,  isAdmin, ManageMatriculas.Baja); /* dar baja de la matricula */

// CONSEJOS POPULARES 
submisionRouter.delete('/consejos/:id', isAuthorized,  isAdmin,  SubmisionUtiles.DeleteConsejo);


module.exports = submisionRouter;
