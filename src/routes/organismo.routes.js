const Router = require('express');
const OrganismoController = require('../controllers/organismo/organismo.controller');

const { organismoDataValidation } = require('../validations/organismo.validations');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const organismoRouter = Router();

organismoRouter.post('/', [organismoDataValidation], /* isAuthorized, isAdmin, */ OrganismoController.AddOrganismo);
organismoRouter.get('/', /* isAuthorized, */ OrganismoController.FindAllOrganismos);
organismoRouter.get('/:id', /* isAuthorized, */ OrganismoController.FindSingleOrganismo);
organismoRouter.put('/:id', [organismoDataValidation], /* isAuthorized, isAdmin, */ OrganismoController.UpdateOrganismo);
organismoRouter.delete('/:id', /* isAuthorized, isAdmin, */ OrganismoController.DeleteOrganismo);

module.exports = organismoRouter;
