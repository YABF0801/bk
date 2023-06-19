const { Type } = require('@sinclair/typebox');
/* const addErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true }); */

/**
 * @return AJV JsonSchema
 */

const ParentsValidationSchema = Type.Array(
  Type.Object(
  {
    parentName: Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo de parentName no es válido, debe ser string',
      minLength: 'Debe tener mínimo 2 caracteres',}
    }),
    parentLastname: Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo de parentLastname no es válido, debe ser string',
      minLength: 'Debe tener mínimo 2 caracteres',}
    }),
    uniqueParent: Type.Optional(Type.Boolean({
      errorMessage: {type: 'El tipo de uniqueParent no es válido, debe ser boolean'}
    })),
    typeParent: Type.String({
      enum: ['madre', 'padre', 'tutor'],
      errorMessage: {type: 'El tipo de typeParent no es válido, debe ser String',
        enum: 'El valor de parentesco no es aceptado',
      },
    }),
    convivencia: Type.Boolean({
      errorMessage: {type: 'El tipo de convivencia no es válido, debe ser boolean'}
    }),
    parentAddress: Type.Optional(Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo de parentAdress no es válido, debe ser string',
      minLength: 'Debe tener mínimo 2 caracteres',}
    })),
    phoneNumber:  Type.Optional(Type.String({
      format: 'phone',
      minLength: 8,
      maxLength: 15,
      errorMessage: {type: 'El tipo de phoneNumber no es válido',
      format: 'No es un número de teléfono valido',
      minLength: 'Debe tener mínimo 8 digitos',
      maxLength: 'Debe tener máximo 15 digitos'
      },
    })),
    occupation: Type.String({
      enum: ['trabajador', 'jubilado', 'asistenciado', 'estudiante'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),
    workName: Type.Optional(Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'Debe tener mínimo 2 caracteres',}
    })),
    workAddress: Type.Optional(Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'Debe tener mínimo 2 caracteres',}
    })),
    jobTitle: Type.Optional(Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo no es válido, debe ser String',
      minLength: 'Debe tener mínimo 4 caracteres'},
    })),
    organismo: Type.Optional(
      Type.Object({
      name: Type.String({
        errorMessage: { type: 'El tipo name de organismo no es válido, debe ser String' },
      }),
      weight: Type.Optional(Type.Number({
        errorMessage: { type: 'El tipo peso de organismo no es válido, debe ser un número' },
      })) 
    })
    ),
    salary: Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' }
    }), 
    otherChildrenInCi: Type.Optional(Type.Boolean({
      errorMessage: {type: 'El tipo de otherChildrenCi no es válido, debe ser boolean'}
    })),   
    numberOfOtherChildrenInCi: Type.Optional(Type.Number({
      errorMessage: { type: 'El tipo no es válido, debe ser un número' }
    })), 
    otherChildrenCenter: Type.Optional(Type.String({
      errorMessage: { type: 'El tipo name de centro no es válido, debe ser String' },
    })),
    pregnant: Type.Optional(Type.Boolean({
      errorMessage: {type: 'El tipo no es válido, debe ser boolean'}
    })),  
    deaf: Type.Optional(Type.Boolean({
      errorMessage: {type: 'El tipo no es válido, debe ser boolean'}
    })),  
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Está enviando data adicional de los padres',
    },
  }
));

/* ajv.addFormat('phone', /^[+]*[0-9]*$/); 
addFormats(ajv).addKeyword('kind').addKeyword('modifier');
addErrors(ajv); 
 */
/* const validateSchema = ajv.compile(ParentsValidationSchema);

const parentsDataValidation = (req, res, next) => {
  const isDataValid = validateSchema(req.body);

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};
 */

module.exports =  ParentsValidationSchema; 
