/* const isEmpty = require("./isEmpty");
const validator = require("validator"); */
const {Type} = require("@sinclair/typebox");
const addErrors = require("ajv-errors");
const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true}).addKeyword('kind').addKeyword('modifier');


/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */  // ESTO ESTA COMENTADO PORQUE DABA ERROR 
/* const EmptyFieldCirculo = (data) =>  { 
  const errors = {};
  data.number = !isEmpty(data.number) ? data.number : 0; 
  data.name = !isEmpty(data.name) ? data.name : "";
  data.lat = !isEmpty(data.lat) ? data.lat : 0; 
  data.lon = !isEmpty(data.lon) ? data.lon : 0; 
  
  if (validator.isEmpty(data.number)) {
    errors.number = "Numero requerido";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Nombre requerido";
  }
  if (validator.isEmpty(data.lat)) {
    errors.lat = "Latitud requerida";
  }
  if (validator.isEmpty(data.lon)) {
    errors.lon = "Longitud requerido";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
}; */

/* ------------- AJV TYPE VALIDATION */
const CirculoValidationSchema = Type.Object( /* VER IS HAY Q PONERLAS TODAS OPCIONAL Y REQUERIDAS PARA ADITIONAL */
    {
        number: Type.Number({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        name: Type.String({
          minLength: 4,
          maxLength: 30,
          errorMessage: {type: 'El tipo no es válido, debe ser string',
          minLength: 'debe tener minimo 4 caracteres',
          maxLength: 'debe tener máximo 30 caracteres'}
        }),
        normed_capacity2: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        normed_capacity3: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        normed_capacity4: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        normed_capacity5: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        normed_capacity6: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        
        lat: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        lon: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser number'}
        }),
        
        isCiActive: Type.Boolean({
          errorMessage: {type: 'El tipo no es válido, debe ser boolean'}
        })
    },
);

addErrors(ajv);

const validateSchema = ajv.compile(CirculoValidationSchema);

  const circuloDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);

   
    if (!isDataValid)
        return res.status(400).json({
            errors: validateSchema.errors.map((error) => error.message),
        });

    next();
};
 
module.exports = {circuloDataValidation}; 
