const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */
/* const EmptyFieldParents = (data) =>  { 
  const errors = {};

  data.parentName = !isEmpty(data.parentName) ? data.parentName : "";
  data.parentLastname = !isEmpty(data.parentLastname) ? data.parentLastname : "";
  data.phoneNumber = !isEmpty(data.cPopular) ? data.cPopular : null;

  data.workName = !isEmpty(data.workName) ? data.workName : "";
  data.workAddress = !isEmpty(data.workAddress) ? data.workAddress : ""; 
  data.organismo = !isEmpty(data.organismo) ? data.organismo : ''; 

  if (validator.isEmpty(data.parentName)) {
    errors.parentName = "Nombre requerido";
  }
  if (validator.isEmpty(data.parentLastname)) {
    errors.parentLastname = "Apellido requerido";
  }
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = 'Numero de Telefono requerido';
  }
  if (validator.isEmpty(data.workName)) {
    errors.workName = "Nombre del centro de trabajo requerido";
  }
  if (validator.isEmpty(data.workAddress)) {
    errors.workAddress = "Direccion del centro de trabajo requerido";
  }
  if (validator.isEmpty(data.organismo)) {
    errors.organismo = 'Objeto Organismo requerido';
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
const ParentsValidationSchema = Type.Object(
  {
    parentName: Type.String({
      minLength: 2,
      maxLength: 20,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 20 caracteres'}
    }),
    parentLastname: Type.String({
      minLength: 2,
      maxLength: 50,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 50 caracteres'}
    }),
    uniqueParent: Type.Boolean({
      errorMessage: {type: 'El tipo de priorizado no es válido, debe ser boolean'}
    }),
    typeParent: Type.String({
      enum: ['madre', 'padre', 'tutor'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),
    convivencia: Type.Boolean({
      errorMessage: {type: 'El tipo de priorizado no es válido, debe ser boolean'}
    }),
    parentAdress: Type.String({
      minLength: 2,
      maxLength: 70,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 70 caracteres'}
    }),
    phoneNumber: Type.String({
      format: 'phone',
      minLength: 8,
      maxLength: 15,
      errorMessage: {type: 'El tipo no es válido',
      format: 'no es un número de teléfono valido',
      minLength: 'debe tener mínimo 8 digitos',
      maxLength: 'debe tener máximo 15 digitos'
      },
    }),
    occupation: Type.String({
      enum: ['trabajador', 'jubilado', 'asistenciado', 'estudiante'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),
    workName: Type.String({
      minLength: 2,
      maxLength: 70,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 70 caracteres'}
    }),
    workAddress: Type.String({
      minLength: 2,
      maxLength: 70,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 70 caracteres'}
    }),
    jobTitle: Type.String({
      minLength: 4,
      maxLength: 50,
      errorMessage: {type: 'El tipo no es válido, debe ser String',
      minLength: 'debe tener minimo 4 caracteres',
      maxLength: 'debe tener máximo 50 caracteres'
      },
    }),
    organismo: Type.Optional(
      Type.Object({
      name: Type.String(),
      weight: Type.Number() 
    })
    ),
    salary: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' }
    }), 
    otherChildrenCi: Type.Boolean({
      errorMessage: {type: 'El tipo de priorizado no es válido, debe ser boolean'}
    }),   
    numberOfOtherChildrenInCi: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' }
    }), 

    /* otherChildrenCenter */

    pregnant: Type.Boolean({
      errorMessage: {type: 'El tipo no es válido, debe ser boolean'}
    }),  
    deaf: Type.Boolean({
      errorMessage: {type: 'El tipo no es válido, debe ser boolean'}
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
ajv.addFormat('phone', /^[+]*[0-9]*$/); 
addErrors(ajv); 

const validateSchema = ajv.compile(ParentsValidationSchema);

const parentsDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports =  {parentsDataValidation}; 
