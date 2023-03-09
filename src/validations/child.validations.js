const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/**
 * @return AJV JsonSchema
 */
const ChildValidationSchema = Type.Object(
  {
    childName: Type.String({
      minLength: 2,
      maxLength: 20,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 20 caracteres'}
    }),
    childLastname: Type.String({
      minLength: 2,
      maxLength: 50,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 50 caracteres'}
    }),
    carnet: Type.Number({
      format: 'carnet',
      errorMessage: {type: 'El tipo no es válido, debe ser un número',
      format: 'no es un carnet valido'
    }}),
    sex: Type.String({
      enum: ['masculino', 'femenino'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado'},
    }),
    age: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    year_of_life: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    childAdress: Type.String({
      minLength: 2,
      maxLength: 70,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 70 caracteres'},
    }),
    neighborhood: Type.String({
      minLength: 2,
      maxLength: 30,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      inLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 30 caracteres'},
    }),
    cPopular: Type.String({
      errorMessage: {type: 'El tipo no es válido, debe ser string'},
    }),
    municipality: Type.String({
      errorMessage: {type: 'El tipo no es válido, debe ser string'},
    }),
    circulo: Type.Optional(Type.Object({
      id: Type.String(),
      name: Type.String()
    })),
    lat: Type.Number ({
      errorMessage: {type: 'El tipo no es válido, debe ser un número',
    }
    }),
    lon: Type.Number ({
      errorMessage: {type: 'El tipo no es válido, debe ser un número',
    }
    }),

   /*    parents */

  },
/*   {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Estas enviando data adicionales',
    },
  } */
);

ajv.addFormat('carnet', /^[0-9]{11}$/); 
addFormats(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv); 

const validateSchema = ajv.compile(ChildValidationSchema); 

 const childDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports = {childDataValidation};  
 

