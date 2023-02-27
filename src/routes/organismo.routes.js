const Router  = require('express');
const { AddOrganismo, FindAllOrganismos, FindSingleOrganismo, UpdateOrganismo, DeleteOrganismo } = require('../controllers/organismo/organismo.controller');
/* const isAdmin = require('../midlewares/isAdmin');
const isAuthorized = require('../midlewares/isAuthorized'); */

const organismoRouter = Router();

organismoRouter.post('/new/', /* isAdmin, */ AddOrganismo);   /* add organismo */
organismoRouter.get('/find/', /* isAuthorized, */ FindAllOrganismos);   /* find all organismos */
organismoRouter.get('/find/:name', /* isAuthorized, */ FindSingleOrganismo);   /* find single organismo by name */
organismoRouter.put('/update/:id', /* isAdmin, */ UpdateOrganismo);   /* update organismo */
organismoRouter.delete('/:id', /* isAdmin, */ DeleteOrganismo);   /* delete organismo */

module.exports = organismoRouter;
