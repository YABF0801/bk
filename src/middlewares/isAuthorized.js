const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const tokenBearer = req.headers.authorization;

  if (!tokenBearer) {
    const error = new Error();
    error.status = 401;
    error.message = 'Token debe ser formato Bearer';
    throw error;
  }

  const token = tokenBearer.split(' ')[1];

  const payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload) {
    req.userId = payload.id;
    next();
  } else {
    return res.status(403).json({ message: 'usuario no autorizado' });
  }
};
