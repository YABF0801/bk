const { Router } = require('express');
/* const { Login, Logout } = require('../controllers/user/auth.controller'); */
const {
  AddUser,
  FindAllUsers,
  FindSingleUser,
  UpdateUser,
  DeleteUser,
} = require('../controllers/user/user.controller');
/* const isAdmin = require('../midlewares/isAdmin');  */

const userRouter = Router();

// rutas de sesion
/* userRouter.post('/login', Login);
userRouter.get('/logout', Logout);  */

// otras rutas de user
userRouter.post('/', /* isAuthorized, isAdmin, */ AddUser);
userRouter.get('/', /* isAuthorized, isAdmin,  */ FindAllUsers);
userRouter.get('/:id', /* isAuthorized, isAdmin, */ FindSingleUser);
userRouter.put('/:id', /* isAuthorized,  isAdmin, */ UpdateUser);
userRouter.delete('/:id', /* isAuthorized,  isAdmin,  */ DeleteUser);

module.exports = userRouter;
