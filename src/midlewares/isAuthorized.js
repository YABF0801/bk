require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "token inexistente" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (decoded.role === 'ADMIN' || decoded.role === 'GUEST') {
      req.user = decoded;
      next();
  } else {
      return res.status(403).json({ message: "usuario no autorizado" });
  }
  } catch (err) {
    return res.status(401).json({ message: "token invalido" });
  }
};
