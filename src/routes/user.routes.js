const { Router } = require('express');
const UserController = require('../controllers/user/user.controller');
const {userDataValidation} = require('../validations/user.validations');
/* const { Login, Logout } = require('../controllers/user/auth.controller'); */
/* const isAdmin = require('../midlewares/isAdmin');  */

const userRouter = Router();

// rutas de sesion
/* userRouter.post('/login', Login);
userRouter.get('/logout', Logout);  */

// otras rutas de user
userRouter.post('/', /* isAuthorized, isAdmin, */ [userDataValidation], UserController.AddUser);
userRouter.get('/', /* isAuthorized, isAdmin,  */ UserController.FindAllUsers);
userRouter.get('/:id', /* isAuthorized, isAdmin, */ UserController.FindSingleUser);
userRouter.put('/:id', /* isAuthorized,  isAdmin, */ [userDataValidation], UserController.UpdateUser);
userRouter.delete('/:id', /* isAuthorized,  isAdmin,  */ UserController.DeleteUser);

module.exports = userRouter;
