const router = require('express').Router();
const UserController = require('../controllers/auth.controller');

router.post('/signin', UserController.sigIn);

module.exports = router;
