const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */
/* const EmptyFieldSubmision = (data) =>  { 
  const errors = {};
  data.entryNumber = !isEmpty(data.entryNumber) ? data.entryNumber : null; 
  data.motive = !isEmpty(data.motive) ? data.motive : '';
  data.child = !isEmpty(data.child) ? data.child : ''; 

  if (validator.isEmpty(data.entryNumber)) {
    errors.entryNumber = 'Numero de entrada requerido';
  }
  if (validator.isEmpty(data.motive)) {
    errors.motive = 'Motivo requerido';
  }
  if (validator.isEmpty(data.child)) {
    errors.child = 'Objeto child requerido';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
 */

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
    motive: Type.String({
      errorMessage: { type: 'El tipo no es válido, debe ser String' },
    }),
    status: Type.String({
      enum: ['pendiente', 'propuesta', 'matricula', 'baja'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),

/*     ciPedido */
/*     child    */

    weight: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })
  },
 /*  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Estas enviando data adicionales',
    },
  } */
);

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