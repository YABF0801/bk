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

organismoRouter.post('/new/', /* isAuthorized, isAdmin, */ AddOrganismo);
organismoRouter.get('/find/', /* isAuthorized, */ FindAllOrganismos);
organismoRouter.get('/find/:name', /* isAuthorized, */ FindSingleOrganismo); /* find single organismo by name */
organismoRouter.put('/update/:id', /* isAuthorized, isAdmin, */ UpdateOrganismo);
organismoRouter.delete('/:id', /* isAuthorized, isAdmin, */ DeleteOrganismo);

module.exports = organismoRouter;
