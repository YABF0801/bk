const Router = require('express');
const {
  AddOrganismo,
  FindAllOrganismos,
  FindSingleOrganismo,
  UpdateOrganismo,
  DeleteOrganismo,
} = require('../controllers/organismo/organismo.controller');
const { organismoDataValidation } = require('../validations/organismo.validations');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const organismoRouter = Router();

organismoRouter.post('/', [organismoDataValidation], /* isAuthorized, isAdmin, */ AddOrganismo);
organismoRouter.get('/', /* isAuthorized, */ FindAllOrganismos);
organismoRouter.get('/:id', /* isAuthorized, */ FindSingleOrganismo);
organismoRouter.put('/:id', /* isAuthorized, isAdmin, */ UpdateOrganismo);
organismoRouter.delete('/:id', /* isAuthorized, isAdmin, */ DeleteOrganismo);

module.exports = organismoRouter;
