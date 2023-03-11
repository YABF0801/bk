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
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),
    submisiontype: Type.String({
      enum: ['new', 'traslado'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),
    entryNumber: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    socialCase: Type.Boolean({
      errorMessage: { type: 'El tipo no es válido, debe ser Boolean' },
    }),
    motive: Type.Optional(
      Type.String({
      errorMessage: { type: 'El tipo no es válido, debe ser String' },
    })),
    status: Type.String({
      enum: ['pendiente', 'propuesta', 'matricula', 'baja'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),
    ciPedido: Type.Optional(
      Type.Object({
      name: Type.String({
        errorMessage: { type: 'El tipo name de ciPedido no es válido, debe ser String' },
      }),
    })
    ),

    child: ChildValidationSchema,

    weight: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    createdBy: Type.Optional(
      Type.Object({
      _id: Type.String({errorMessage: { type: 'El tipo  _id de createdBy no es válido, debe ser String' },}),
      nickname: Type.String({errorMessage: { type: 'El tipo nickname de createdBy no es válido, debe ser String' },}),
    })),

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
ajv.addFormat("carnet", carnet ); 
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

module.exports = {submisionDataValidation}; 