const isEmpty = require('./isEmpty');
const validator = require('validator');
const {Type} = require("@sinclair/typebox");
const addErrors = require("ajv-errors");
const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true}).addKeyword('kind').addKeyword('modifier');


/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */
const EmptyFieldSubmision = (data) =>  { 
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

/* ------------- AJV TYPE VALIDATION */
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
      errorMessage: { type: 'El tipo no es válido, debe ser Number' },
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
    weight: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser Number' },
    })
  },
);

addErrors(ajv);

const validateSchema = ajv.compile(SubmisionValidationSchema);

const submisionDataValidation = (req, res, next) => {
  const isEmpty = EmptyFieldSubmision();
  const isDataValid = validateSchema(req.body);

  if (isEmpty)
    return res.status(400).send({
      errors: EmptyFieldSubmision.errors.map((error) => error.message),
    });

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports = {submisionDataValidation}; 