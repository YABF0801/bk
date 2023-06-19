const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/**
 * @return AJV JsonSchema
 */
const AuthValidationSchema = Type.Object(
  {
    nickname: Type.String({
      minLength: 2,
      maxLength: 10,
      errorMessage: {
        type: 'Nombre de usuario no válido',
      },
    }),
    password: Type.String({
      errorMessage: {
        type: 'Contraseña no válida',
        minLength: 'Debe tener minimo 2 caracteres',
        maxLength: 'Debe tener máximo 10 caracteres',
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Está enviando datos adicionales',
    },
  }
);

addFormats(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(AuthValidationSchema);

const circuloDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);

  if (!isDataValid)
    return res.status(400).json({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports = { circuloDataValidation };
