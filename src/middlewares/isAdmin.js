require('dotenv').config();

module.exports = function (req, res, next) {
  const user = req.user;
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'usuario no autorizado' });
  }
  next();
};
