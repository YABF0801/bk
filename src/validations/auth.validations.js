const isEmpty = require('./isEmpty');
const validator = require('validator');
const validatePassword = require('./validatePassword');

exports.validateLoginInput = (data) => {
  const errors = {};

  data.nickname = !isEmpty(data.nickname) ? data.nickname : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (validator.isEmpty(data.nickname)) {
    errors.nickname = 'Nickname es requerido';
  }
  if (!validator.isLength(data.nickname, { min: 2, max: 30 })) {
    errors.nickname = 'formato de nickname invalido';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'contraseña requerida';
  }
  if (!validatePassword(data.password)) {
    errors.password = "Formato de contraseña incorrecto";
}

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

