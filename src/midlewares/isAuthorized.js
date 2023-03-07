require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    const error = new Error();
    error.status = 401;
    error.message = 'Token no valido';
    throw error;
  }

  const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (payload) {
    req.user = payload;
    next();
  } else {
    return res.status(403).json({ message: 'usuario no autorizado' });
  }
};
