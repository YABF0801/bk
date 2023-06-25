const { Type } = require('@sinclair/typebox');
/**
 * @return AJV JsonSchema
 */

const ParentsValidationSchema = Type.Array(
  Type.Object(
  {
    parentName: Type.String({
      errorMessage: {type: 'El tipo de parentName no es válido, debe ser string'}
    }),
    parentLastname: Type.String({
      errorMessage: {type: 'El tipo de parentLastname no es válido, debe ser string'}
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
      errorMessage: {type: 'El tipo de parentAdress no es válido, debe ser string'}
    })),
    phoneNumber:  Type.Optional(Type.String({
      errorMessage: {type: 'El tipo de phoneNumber no es válido'},
    })),
    occupation: Type.String({
      enum: ['trabajador', 'jubilado', 'asistenciado', 'estudiante'],
      errorMessage: {type: 'El tipo no es válido, debe ser String',
        enum: 'El valor no es aceptado',
      },
    }),
    workName: Type.Optional(Type.String({
      errorMessage: {type: 'El tipo no es válido, debe ser string'}
    })),
    workAddress: Type.Optional(Type.String({
      errorMessage: {type: 'El tipo no es válido, debe ser string'}
    })),
    jobTitle: Type.Optional(Type.String({
      errorMessage: {type: 'El tipo no es válido, debe ser String'},
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


module.exports =  ParentsValidationSchema; 
