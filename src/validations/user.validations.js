const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/**
 * @return AJV JsonSchema
 */
const UserValidationSchema = Type.Object(
  {
    nickname: Type.String({
      minLength: 2,
      maxLength: 10,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 2 caracteres',
        maxLength: 'debe tener máximo 10 caracteres',
      },
    }),
    name: Type.String({
      minLength: 2,
      maxLength: 20,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 2 caracteres',
        maxLength: 'debe tener máximo 20 caracteres',
      },
    }),
    lastname: Type.String({
      minLength: 4,
      maxLength: 50,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 4 caracteres',
        maxLength: 'debe tener máximo 50 caracteres',
      },
    }),
    password: Type.String({
      format: "password",
      minLength: 8,
      errorMessage: {
        type: 'El tipo no es válido, debe ser un string',
        format: 'password debe contener al menos una mayúscula, una minúscula y un número',
        minLength: 'password debe tener minimo 8 caracteres',
      },
    }),
    position: Type.String({
      minLength: 4,
      maxLength: 50,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 4 caracteres',
        maxLength: 'debe tener máximo 50 caracteres',
      },
    }),
    role: Type.String({
      enum: ['admin', 'guest'],
      errorMessage: { type: 'El tipo no es válido, debe ser String', enum: 'El valor no es aceptado' },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Estas enviando datos adicionales',
    },
  }
);


const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/;
ajv.addFormat("password", regex);
addFormats(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(UserValidationSchema);

const userDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};


module.exports = { userDataValidation };
