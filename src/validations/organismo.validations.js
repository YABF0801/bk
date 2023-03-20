const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/**
 * @return AJV JsonSchema
 */
const OrganismoValidationSchema = Type.Object(
  {
    name: Type.String({
      minLength: 2,
      maxLength: 30,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 2 caracteres',
        maxLength: 'debe tener máximo 30 caracteres',
      },
    }),
    description: Type.String({
      minLength: 5,
      maxLength: 80,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 5 caracteres',
        maxLength: 'debe tener máximo 80 caracteres',
      },
    }),
    priorizado: Type.Optional(Type.Boolean({
      default: false,
      errorMessage: { type: 'El tipo de priorizado no es válido, debe ser boolean' },
    })),
    weight: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo de peso no es válido, debe ser un número' },
    })),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Estas enviando data adicionales',
    },
  }
);

addFormats(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(OrganismoValidationSchema);

const organismoDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);


  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports = { organismoDataValidation };
