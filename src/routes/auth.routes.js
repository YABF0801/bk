const router = require('express').Router();
const UserController = require('../controllers/auth.controller');

router.post('/signin', UserController.sigIn);

router.post('/another-route', (req, res) => {
  // router code here
});

module.exports = router;
