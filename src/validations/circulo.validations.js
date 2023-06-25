const { Type } = require('@sinclair/typebox');
const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/**
 * @return AJV JsonSchema
 */
const CirculoValidationSchema = Type.Object(
  {
    number: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    name: Type.String({
      minLength: 2,
      errorMessage: {
        type: 'El tipo no es válido, debe ser string',
        minLength: 'Debe tener mínimo 4 caracteres',
      },
    }),
    circulotype: Type.String({
      enum: ['rural', 'urbano'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado, debe ser urbano o rural',
      },
    }),
    normed_capacity2: Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    normed_capacity3: Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    normed_capacity4: Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    normed_capacity5: Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    }),
    normed_capacity6: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),

    matricula2: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    matricula3: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    matricula4: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    matricula5: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    matricula6: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),

    attendance2:  Type.Optional(Type.Number({
      default: 100,
      minimum: 0,
      maximum: 100,
      errorMessage: { type: 'El tipo no es válido, debe ser un número',
      minimum: 'El porciento debe ser mayor o igual a 0',
      maximum: 'El porciento debe ser menor o igual a 100',}
    })),
    attendance3:  Type.Optional(Type.Number({
      default: 100,
      minimum: 0,
      maximum: 100,
      errorMessage: { type: 'El tipo no es válido, debe ser un número',
      minimum: 'El porciento debe ser mayor o igual a 0',
      maximum: 'El porciento debe ser menor o igual a 100',}
    })),
    attendance4:  Type.Optional(Type.Number({
      default: 100,
      minimum: 0,
      maximum: 100,
      errorMessage: { type: 'El tipo no es válido, debe ser un número',
      minimum: 'El porciento debe ser mayor o igual a 0',
      maximum: 'El porciento debe ser menor o igual a 100',}
    })),
    attendance5:  Type.Optional(Type.Number({
      default: 100,
      minimum: 0,
      maximum: 100,
      errorMessage: { type: 'El tipo no es válido, debe ser un número',
      minimum: 'El porciento debe ser mayor o igual a 0',
      maximum: 'El porciento debe ser menor o igual a 100',}
    })),
    attendance6: Type.Optional(Type.Number({
      default: 100,
      minimum: 0,
      maximum: 100,
      errorMessage: { type: 'El tipo no es válido, debe ser un número',
      minimum: 'El porciento debe ser mayor o igual a 1',
      maximum: 'El porciento debe ser menor o igual a 100',}
    })),

    calculated_capacity2: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    calculated_capacity3: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    calculated_capacity4: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    calculated_capacity5: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    calculated_capacity6: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })), 

    girls2: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    girls3: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    girls4: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    girls5: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),
    girls6: Type.Optional(Type.Number({
      default: 0,
      errorMessage: { type: 'El tipo no es válido, debe ser un número' },
    })),

    latlng: Type.Optional(Type.Tuple(
        [
          Type.Number({
            minimum: -90,
            maximum: 90,
            errorMessage: { type: 'La latitud debe estar entre -90 y 90 grados' },
          }),
          Type.Number({
            minimum: -180,
            maximum: 180,
            errorMessage: { type: 'La longitud debe estar entre -180 y 180 grados' },
          })
        ],
        {
          errorMessage: { type: 'El tipo de latlng no es válido, debe ser arreglo de coordenadas' },
        }
      )),
      
    isCiActive: Type.Optional(Type.Boolean({
      default: true,
      errorMessage: { type: 'El tipo de activo no es válido, debe ser boolean' },
    })),
  },

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

module.exports = { circuloDataValidation };
