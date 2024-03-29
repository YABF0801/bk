const { Router } = require('express');
const UserController = require('../controllers/user/user.controller');
const { userDataValidation } = require('../validations/user.validations');
const isAdmin = require('../middlewares/isAdmin');
const isAuthorized = require('../middlewares/isAuthorized');

const userRouter = Router();

userRouter.post('/', isAuthorized, isAdmin, [userDataValidation], UserController.AddUser);
userRouter.get('/', isAuthorized, isAdmin, UserController.FindAllUsers);
userRouter.get('/:id', isAuthorized, isAdmin, UserController.FindSingleUser);
userRouter.put('/:id', isAuthorized, isAdmin, [userDataValidation], UserController.UpdateUser);
userRouter.delete('/:id', isAuthorized, isAdmin, UserController.DeleteUser);

module.exports = userRouter;
