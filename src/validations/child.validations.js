const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */
/* const EmptyFieldChild = (data) => { 
  const errors = {};

  data.childName = !isEmpty(data.childName) ? data.childName : "";
  data.childLastname = !isEmpty(data.childLastname) ? data.childLastname : "";
  data.carnet = !isEmpty(data.carnet) ? data.carnet : null;  
  data.year_of_life = !isEmpty(data.year_of_life) ? data.year_of_life : null; 
  data.childAdress = !isEmpty(data.childAdress) ? data.childAdress : "";
  data.cPopular = !isEmpty(data.cPopular) ? data.cPopular : "";
  data.municipality = !isEmpty(data.municipality) ? data.municipality : "";
  data.lat = !isEmpty(data.lat) ? data.lat : null; 
  data.lon = !isEmpty(data.lon) ? data.lon : null; 
  data.parents = !isEmpty(data.parents) ? data.parents : ''; 

  if (validator.isEmpty(data.childName)) {
    errors.childName = "Nombre requerido";
  }
  if (validator.isEmpty(data.childLastname)) {
    errors.childLastname = "Apellido requerido";
  }
  if (validator.isEmpty(data.carnet)) {
    errors.carnet = 'Carnet de identidad requerido';
  }
  if (validator.isEmpty(data.year_of_life)) {
    errors.year_of_life = "Año de vida requerido";
  }
  if (validator.isEmpty(data.childAdress)) {
    errors.childAdress = "Direccion requerida";
  }
  if (validator.isEmpty(data.cPopular)) {
    errors.cPopular = 'Consejo Popular requerido';
  }
  if (validator.isEmpty(data.municipality)) {
    errors.municipality = 'Municipio requerido';
  }
  if (validator.isEmpty(data.lat)) {
    errors.lat = "Latitud requerida";
  }
  if (validator.isEmpty(data.lon)) {
    errors.lon = "Longitud requerido";
  }
  if (validator.isEmpty(data.parents)) {
    errors.parents = 'Objeto Parents requerido';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}; */

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
      min: -90,
      max: 90,
      errorMessage: {type: 'El tipo no es válido, debe ser un número',
      min: 'la latitud debe estar entre 0 y 90, positivo o negativo',
      max: 'la latitud debe estar entre 0 y 90, positivo o negativo'
    }
    }),
    lon: Type.Number ({
      min: -180,
      max: 180,
      errorMessage: {type: 'El tipo no es válido, debe ser un número',
      min: 'la longitud debe estar entre 0 y 180, positivo o negativo',
      max: 'la longitud debe estar entre 0 y 180, positivo o negativo'
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

addFormats(ajv).addKeyword('kind').addKeyword('modifier');
ajv.addFormat('carnet', /^[0-9]{11}$/); 
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
 

