const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

// /* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */
// const EmptyFieldOrganismo = (data) => {
//   const errors = {};
//   data.name = !isEmpty(data.name) ? data.name : '';
//   data.description = !isEmpty(data.description) ? data.description : '';

//   if (validator.isEmpty(data.name)) {
//     errors.name = 'Nombre requerido';
//   }
//   if (validator.isEmpty(data.description)) {
//     errors.description = 'Descripcion requerida';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors),
//   };
// };

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
      minLength: 10,
      maxLength: 80,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 10 caracteres',
        maxLength: 'debe tener máximo 80 caracteres',
      },
    }),
    priorizado: Type.Boolean({
      errorMessage: { type: 'El tipo de priorizado no es válido, debe ser boolean' },
    }),
    weight: Type.Number({
      errorMessage: { type: 'El tipo de peso no es válido, debe ser un número' },
    }),
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
  // const isEmpty = EmptyFieldOrganismo();
  const isDataValid = validateSchema(req.body);

  // if (isEmpty)
  //   return res.status(400).send({
  //     errors: EmptyFieldOrganismo.errors.map((error) => error.message),
  //   });

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports = { organismoDataValidation };
