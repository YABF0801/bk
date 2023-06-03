const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, validateFormats: true });

/**
 * @return AJV JsonSchema
 */
const UserValidationSchema = Type.Object(
  {
    nickname: Type.String({
      minLength: 2,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 2 caracteres',
      },
    }),
    name: Type.String({
      minLength: 2,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 2 caracteres',
      },
    }),
    lastname: Type.String({
      minLength: 2,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 2 caracteres',
      },
    }),
    password: Type.Optional(Type.String({
      format: "password-format",
      minLength: 8,
      errorMessage: {
        type: 'El tipo no es válido, debe ser un string',
        format: 'password debe contener al menos una mayúscula, una minúscula y un número',
        minLength: 'password debe tener minimo 8 caracteres',
      },
    })),
    position: Type.String({
      minLength: 2,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 4 caracteres',
      },
    }),
    role: Type.Optional(Type.String({
      enum: ['admin', 'guest'],
      default: 'guest',
      errorMessage: { type: 'El tipo no es válido, debe ser String', 
      enum: 'El valor no es aceptado' },
    })),
    submisions: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
  },
/*    {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Estas enviando datos adicionales',
    },
  }  */
);

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
ajv.addFormat('password-format', regex); 
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
