const isEmpty = require('./isEmpty');
const validator = require('validator');
const {Type} = require("@sinclair/typebox");
const addErrors = require("ajv-errors");
const addFormats = require("ajv-formats")
const Ajv = require("ajv");
const validatePassword = require('./validatePassword');
const ajv = new Ajv({allErrors: true}).addKeyword('kind').addKeyword('modifier');

/* ------------- EMPTY FIELD VALIDATION 4 REQUIRED */
const EmptyFieldUser = (data) =>  {
  const errors = {};
  data.nickname = !isEmpty(data.nickname) ? data.nickname : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.position = !isEmpty(data.position) ? data.position : "";
 
  if (!validator.isEmpty(data.nickname)) {
    errors.nickname = "nickname requerido";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Nombre requerido";
  }
  if (validator.isEmpty(data.lastname)) {
    errors.lastname = "Apellidos requeridos";
  }
  if (validator.isEmpty(data.password) || !validatePassword(data.password)) {
    errors.password = "Contraseña requerida y debe contener al menos una mayúscula, una minúscula y un número";
}
  if (validator.isEmpty(data.position)) {
    errors.position = "Cargo requerido";
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
};

/* ------------- AJV TYPE VALIDATION */
const UserValidationSchema = Type.Object(
  {
    nickname: Type.String({
      minLength: 2,
      maxLength: 10,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 10 caracteres'}
    }),
    name: Type.String({
      minLength: 2,
      maxLength: 20,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 2 caracteres',
      maxLength: 'debe tener máximo 20 caracteres'}
    }),
    lastname: Type.String({
      minLength: 4,
      maxLength: 50,
      errorMessage: {type: 'El tipo no es válido, debe ser string',
      minLength: 'debe tener minimo 4 caracteres',
      maxLength: 'debe tener máximo 50 caracteres'}
    }),
    password: Type.String({
      format: 'password',
      minLength: 8,
       errorMessage: {type: 'El tipo no es válido, debe ser un string',
          format: 'password debe contener al menos una mayúscula, una minúscula y un número',
          minLength: 'password debe tener minimo 8 caracteres',
      },}),
    position: Type.String({
      minLength: 4,
      maxLength: 50,
        errorMessage: {type: 'El tipo no es válido, debe ser string',
        minLength: 'debe tener minimo 4 caracteres',
        maxLength: 'debe tener máximo 50 caracteres'}
      }),
    role: Type.String({
      enum: ['ADMIN', 'GUEST'],
        errorMessage: {type: 'El tipo no es válido, debe ser String',
          enum: 'El valor no es aceptado',
        },
      }),
  },
);

addFormats(ajv);
ajv.addFormat('password', /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/); 
addErrors(ajv);

const validateSchema = ajv.compile(UserValidationSchema);

const userDataValidation = (req, res, next) => {
  const isEmpty = EmptyFieldUser();
  const isDataValid = validateSchema(req.body);

   if (isEmpty)
       return res.status(400).send({
           errors: EmptyFieldUser.errors.map((error) => error.message),
        });

  if (!isDataValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });

  next();
};

module.exports =  {userDataValidation}; 



