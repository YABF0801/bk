const { Type } = require('@sinclair/typebox');
const ParentsValidationSchema = require('./parents.validations');


/**
 * @return AJV JsonSchema
 */
const ChildValidationSchema = Type.Object(
  {
    childName: Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo de nombre del niño no es válido, debe ser string',
      minLength: 'Debe tener mínimo 2 caracteres',}
    }),
    childLastname: Type.String({
      minLength: 2,
      errorMessage: {type: 'El tipo de apellido del niño no es válido, debe ser string',
      minLength: 'Debe tener mínimo 2 caracteres',}
    }),
    carnet: Type.Number({
      format: 'carnet',
      errorMessage: {type: 'El tipo de carnet no es válido, debe ser un número',
      format: 'No es un carnet válido'
    }}),
    sex: Type.Optional(Type.String({
      enum: ['masculino', 'femenino'],
      errorMessage: {type: 'El tipo de sexo no es válido, debe ser String',
        enum: 'El valor no es aceptado'},
    })),
    age: Type.Optional(Type.Number({
      errorMessage: { type: 'El tipo de edad no es válido, debe ser un número' },
    })),
    year_of_life: Type.Number({
      errorMessage: { type: 'El tipo de año de vida no es válido, debe ser un número' },
    }),
    childAddress: Type.String({
      minLength: 5,
      errorMessage: {type: 'El tipo de direccion del niño no es válido, debe ser string',
      minLength: 'Debe tener mínimo 5 caracteres'},
    }),
    neighborhood: Type.String({
      errorMessage: {type: 'El tipo de barrio no es válido, debe ser string'},
    }),
    cPopular: Type.String({
      errorMessage: {type: 'El tipo de consejo popular no es válido, debe ser string'},
    }),
    municipality: Type.String({
      errorMessage: {type: 'El tipo de municipio no es válido, debe ser string'},
    }),
    province: Type.String({
      errorMessage: {type: 'El tipo de provincia no es válido, debe ser string'},
    }),
    circulo: Type.Optional(Type.Object({
      _id: Type.String({
        errorMessage: { type: 'El tipo  _id de circulo no es válido, debe ser String' },
      }),
      name: Type.String({
        errorMessage: { type: 'El tipo name de circulo no es válido, debe ser String' },
      })
    })),

    matriculaDate: Type.Optional(Type.String({
      errorMessage: { type: 'El tipo de fecha de matricula no es válido, debe ser fecha', 
      format: 'El tipo no es válido, debe ser una fecha'},
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

    parents: ParentsValidationSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Está enviando data adicional del niño',
    },
  }
);



module.exports = ChildValidationSchema;  
 

