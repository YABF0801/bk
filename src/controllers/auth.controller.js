const jwt = require('jsonwebtoken');
const User = require('../schemas/user.schema');
const { SECRET_KEY } = require('../config/constanst');

const sigIn = async (req, res) => {
  const { nickname, password } = req.body;

  const user = await User.findOne({ nickname });

  if (!user) {
    const error = new Error();
    error.httpStatus = 403;
    error.message = 'Usuario o contraseña incorrectos';
    throw error;
  }

  const isPasswordEqual = user.comparePassword(password);
  if (!isPasswordEqual) {
    const error = new Error();
    error.httpStatus = 403;
    error.message = 'Usuario o contraseña incorrectos';
    throw error;
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '5d' });

  return res.status(200).json({
    token,
    user,
  });
};

module.exports = {
  sigIn,
};
