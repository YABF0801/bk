const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */  
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

/**
 * @return AJV JsonSchema
 */
const CirculoValidationSchema = Type.Object(  
    {
        number: Type.Number({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        name: Type.String({
          minLength: 4,
          maxLength: 30,
          errorMessage: {type: 'El tipo no es válido, debe ser string',
          minLength: 'debe tener minimo 4 caracteres',
          maxLength: 'debe tener máximo 30 caracteres'}
        }),

        normed_capacity2: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        normed_capacity3: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        normed_capacity4: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        normed_capacity5: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        normed_capacity6: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        
        matricula2: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        matricula3: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        matricula4: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        matricula5: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        matricula6: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),

        girls2: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        girls3: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        girls4: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        girls5: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),
        girls6: Type.Number ({
          errorMessage: {type: 'El tipo no es válido, debe ser un número'}
        }),


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
        
        isCiActive: Type.Boolean({
          errorMessage: {type: 'El tipo de activo no es válido, debe ser boolean'}
        })
    },
    {
      additionalProperties: false,
      errorMessage: {
        additionalProperties: 'Estas enviando datos adicionales',
      },
    }
); 

addFormats(ajv).addKeyword('kind').addKeyword('modifier');
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
