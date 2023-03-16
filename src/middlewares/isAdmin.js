const User = require('../schemas/user.schema');

module.exports = async function (req, res, next) {
  const userId = req.userId;

  const user = await User.findById(userId);

  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'usuario no autorizado' });
  }
  next();
};
