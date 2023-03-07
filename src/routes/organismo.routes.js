const Router = require('express');
const {
  AddOrganismo,
  FindAllOrganismos,
  FindSingleOrganismo,
  UpdateOrganismo,
  DeleteOrganismo,
} = require('../controllers/organismo/organismo.controller');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const organismoRouter = Router();

organismoRouter.post('/', /* isAuthorized, isAdmin, */ AddOrganismo);
organismoRouter.get('/', /* isAuthorized, */ FindAllOrganismos);
organismoRouter.get('/:name', /* isAuthorized, */ FindSingleOrganismo); /* find single organismo by name */
organismoRouter.put('/:id', /* isAuthorized, isAdmin, */ UpdateOrganismo);
organismoRouter.delete('/:id', /* isAuthorized, isAdmin, */ DeleteOrganismo);

module.exports = organismoRouter;
