const { Router } = require('express');
/* const { Login, Logout } = require('../controllers/user/auth.controller'); */
const { AddUser, FindAllUsers , FindSingleUserByNickname, FindSingleUserById, UpdateUser, DeleteUser  } = require('../controllers/user/user.controller');
/* const isAdmin = require('../midlewares/isAdmin');  */

const userRouter = Router();

// rutas de sesion
/* userRouter.post('/login', Login);
userRouter.get('/logout', Logout);  */

// otras rutas de user
userRouter.post('/new/',/*  isAdmin, */ AddUser); /* add user */
userRouter.get('/find/',/*  isAdmin,  */FindAllUsers);  /* find all users */
userRouter.get('/find/:id', /* isAdmin, */ FindSingleUserById);  /* find user by id */
userRouter.get('/find/:nickname', /* isAdmin, */ FindSingleUserByNickname); /* find single user nickname */
userRouter.put('/update/:id', /* isAdmin, */ UpdateUser); /* update user */
userRouter.delete('/:id', /* isAdmin,  */DeleteUser);  /* delete user */

module.exports = userRouter;

