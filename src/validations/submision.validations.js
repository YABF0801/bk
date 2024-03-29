const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ChildValidationSchema = require('./child.validations');
const ajv = new Ajv({ allErrors: true });

/**
 * @return AJV JsonSchema
 */
const SubmisionValidationSchema = Type.Object(
  {
    finality: Type.String({
      enum: ['os', 'om'],
      errorMessage: {
        type: 'El tipo de finalidad no es válido, debe ser String',
        enum: 'El valor de  finalidad no es aceptado',
      },
    }),
    submisiontype: Type.String({
      enum: ['nueva', 'traslado'],
      errorMessage: {
        type: 'El tipo de tipo no es válido, debe ser String',
        enum: 'El valor de tipo de planilla no es aceptado',
      },
    }),
    entryNumber: Type.Optional(Type.Number({
      errorMessage: { type: 'El tipo de numero de entrada no es válido, debe ser un número' },
    })),
    socialCase: Type.Boolean({
      errorMessage: { type: 'El tipo de caso social no es válido, debe ser Boolean' },
    }),
    motive: Type.Optional(
      Type.String({
        errorMessage: { type: 'El tipo de motivo no es válido, debe ser String' },
      })),
    status: Type.String({
      enum: ['pendiente', 'propuesta', 'matricula', 'baja'],
      errorMessage: {
        type: 'El tipo de status no es válido, debe ser String',
        enum: 'El valor de estado no es aceptado',
      },
    }),
    ciPedido: Type.Optional(
      Type.String({
        errorMessage: { type: 'El tipo de ciPedido no es válido, debe ser String' },
      }),
    ),

    child: ChildValidationSchema,

    weight: Type.Optional(Type.Number({
      errorMessage: { type: 'El tipo de peso no es válido, debe ser un número' },
    })),
    createdBy:
      Type.String({
        errorMessage: { type: 'El tipo nickname de createdBy no es válido, debe ser String' },
      }),

  },
  /*   {
      additionalProperties: false,
      errorMessage: {
        additionalProperties: 'Estas enviando datos adicionales en la planilla',
      },
    }  */
);

const carnet = /^[0-9]{11}$/;
const phone = /^[0-9]{8,15}$/;
ajv.addFormat("carnet", carnet);
ajv.addFormat("phone", phone);
addFormats(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(SubmisionValidationSchema);

const submisionDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports = { submisionDataValidation }; 