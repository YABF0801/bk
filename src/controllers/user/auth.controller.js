require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../schemas/user.schema');
const { validateLoginInput } = require('../../validations/auth.validations');

const Login = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) { return res.status(400).json(errors); }

    if (!nickname || !password) {
      return res.status(400).json({ message: 'Ingrese nickname y password' });
    }

    const user = await User.findOne({ nickname }).exec();
  if (!user) return res.status(400).json({ message:'Usuario no existe'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear y firmar el token
    const payload = { id: user._id, nickname: user.nickname, role: user.role };

    jwt.sign( payload, process.env.JWT_PRIVATE_KEY, { expiresIn: "4h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Error en el servidor");
      }
};

// Logout devolver a la pantalla de inicio
const Logout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token inexistente' });
    }
    // Verificar que el token sea válido
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
      // Invalidar el token
      jwt.invalidate(token, process.env.JWT_PRIVATE_KEY);
      res.status(404).json({ message: 'Usuario no encontrado' });
      
      return res.json({ message: 'Sesión cerrada correctamente' });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

module.exports = {Login, Logout};      

