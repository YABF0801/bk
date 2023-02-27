const isEmpty = require('./isEmpty');
const validator = require('validator');
const {Type} = require("@sinclair/typebox");
const addErrors = require("ajv-errors");
const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true}).addKeyword('kind').addKeyword('modifier');

/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */
const EmptyFieldChild = (data) => { 
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
  data.parents = !isEmpty(data.parents) ? data.parents : ''; /* REVISAR PA OBJETO Q SE PONE "" */

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
};

/* ------------- AJV TYPE VALIDATION */
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
      errorMessage: {type: 'El tipo no es válido, debe ser Number',
    }}),
    sex: Type.String({
      enum: ['masculino', 'femenino'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado'},
    }),
    age: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser Number' },
    }),
    year_of_life: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser Number' },
    }),
    childAdress: Type.String({
      minLength: 2,
      maxLength: 70,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 70 caracteres'},
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
      errorMessage: {type: 'El tipo no es válido, debe ser number'},
    }),
    lon: Type.Number ({
      errorMessage: {type: 'El tipo no es válido, debe ser number'},
    }),
  },
);

addErrors(ajv);

const validateSchema = ajv.compile(ChildValidationSchema); 

 const childDataValidation = (req, res, next) => {
  const isEmpty = EmptyFieldChild();
  const isDataValid = validateSchema(req.body);

  if (isEmpty)
    return res.status(400).send({
      errors: EmptyFieldChild.errors.map((error) => error.message),
    });

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports = {childDataValidation};  
 

