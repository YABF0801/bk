const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config/constanst');
const User = require('../../schemas/user.schema');
const { validateLoginInput } = require('../../validations/auth.validations');

const Login = async (req, res) => {

    const { nickname, password } = req.body;

    const { isValid } = validateLoginInput(req.body);
    if (!isValid) {
      const error = new Error();
      error.status = 400;
      error.message = 'Datos no válidos'
      throw error;
    }

    if (!nickname || !password) {
      const error = new Error();
      error.status = 400;
      error.message = 'Ingrese usuario y contraseña';
      throw error;
    }

    const user = await User.findOne({ nickname }).exec();
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = 'Usuario no existe';
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error();
      error.status = 400;
      error.message = 'Contraseña incorrecta';
      throw error;
    }

    // Crear y firmar el token
    const payload = { id: user._id, nickname: user.nickname, role: user.role };

    jwt.sign( payload, SECRET_KEY, { expiresIn: "4h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
};

// Logout devolver a la pantalla de inicio
const Logout = async (req, res) => {

    const token = req.headers.authorization;
    if (!token) {
      const error = new Error();
      error.status = 401;
      error.message = 'Token inexistente';
      throw error;
    }
    
    // Verificar que el token sea válido
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err)  {
        const error = new Error();
        error.status = 401;
        error.message = 'Token inválido';
        throw error;
      }

      // Invalidar el token
      jwt.invalidate(token, SECRET_KEY);
     
      return res.json({ message: 'Sesión cerrada correctamente' });
    });
};

module.exports = {Login, Logout};      

