const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubmisionSchema = new Schema(
  {
    finality: {
      type: String,
      enum: ['os', 'om'],
      default: 'om',
    },
    submisiontype: {
      type: String,
      enum: ['new', 'traslado'],
      default: 'new',
    },
    entryNumber: {
      type: Number,
      required: true,
    },
    socialCase: {
      type: Boolean,
      default: false,
    },
    motive: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pendiente', 'propuesta', 'matricula', 'baja'],
      default: 'pendiente',
    },
    ciPedido: {
      type: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'circulo',
          name: String,
        },
    },
    weight: {
      type: Number,
      default: 0,
    },
    child: {
      type: Object,
      required: true,
      childName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      childLastname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
      },
      carnet: {
        type: Number,
        required: true,
        unique: true,
      },
      sex: {
        type: String,
        enum: ['masculino', 'femenino'],
      },
      age: {
        type: Number,
        min: 1,
        max: 6,
      },
      year_of_life: {
        type: Number,
        required: true,
        min: 2,
        max: 6,
      },
      childAddress: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 70,
      },
      neighborhood: {
        type: String,
        minLength: 2,
        maxLength: 30,
      },
      cPopular: {
        type: String,
        required: true,
      },
      municipality: {
        type: String,
        required: true,
      },
      province: {
        type: String,
      },
      circulo: {
        type: 
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'circulo',
            select: ['_id', 'name'],
          },
      },
      lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
      },
      lon: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
      },
      parents: {
        type: Array,
        maxItems: 2,
        parentName: {
          type: String,
          required: true,
          minLength: 2,
          maxLength: 20,
        },
        parentLastname: {
          type: String,
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        // 1
        uniqueParent: {
          type: Boolean,
          default: false,
        },
        typeParent: {
          type: String,
          enum: ['madre', 'padre', 'tutor'],
          default: 'madre',
        },
        convivencia: {
          type: Boolean,
          default: true,
        },
        parentAddress: {
          type: String,
          minLength: 2,
          maxLength: 70,
        },
        phoneNumber: {
          type: String,
          required: true,
          minLength: 8,
          maxLength: 15,
        },
        occupation: {
          type: String,
          enum: ['trabajador', 'jubilado', 'asistenciado', 'estudiante'],
          default: 'trabajador',
        },
        workName: {
          type: String,
          required: true,
          minLength: 2,
          maxLength: 70,
        },
        workAddress: {
          type: String,
          required: true,
          minLength: 2,
          maxLength: 70,
        },
        jobTitle: {
          type: String,
          minLength: 4,
          maxLength: 50,
        },
        // 1
        organismo: {
          type: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'organismo',
              name: String,
              weight: Number,
            },
        },
        salary: {
          type: Number,
          validate: {
            validator: function (value) {
              return value >= 0 && value % 1 === 0;
            },
            message: 'salary no es un número válido.',
          },
        },
        // 1
        otherChildrenInCi: {
          type: Boolean,
          default: false,
        },
        // 1
        numberOfOtherChildrenInCi: {
          type: Number,
          default: 0,
        },
        // 1
        otherChildrenCenter: {
          type: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'circulo',
              name: String,
            },
        },
        // 1
        pregnant: {
          type: Boolean,
          default: false,
        },
        // 1
        deaf: {
          type: Boolean,
          default: false,
        },
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      select: ['_id', 'nickname'],
    }
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// hacer todo esto antes de guardar
SubmisionSchema.pre('save', function (next) {
  this.calculateWeight();
  this.Gender(); 
  this.Age(); 
  // Continuar con el guardado
  next();
});

SubmisionSchema.methods.calculateWeight = function () {
  let weight = 0;
  if (this.submisiontype === 'traslado') weight += 36;
  if (this.socialCase === true) weight += 18;
  if (this.child.parents[0].uniqueParent === true) weight += 3;
  if (this.child.parents[0].occupation === 'estudiante') weight += 2;
  if (this.child.parents[0].organismo.weight === 2) weight += 2;
  if (this.child.parents[0].pregnant === true) weight += 2;
  if (this.child.parents[0].deaf === true) weight += 9;
  this.weight = weight;
};

SubmisionSchema.methods.Gender = function () {
  const tenthDigit = this.child.carnet.toString()[9];
  this.child.sex = tenthDigit % 2 === 0 ? 'masculino' : 'femenino'; // par M , impar F
};


SubmisionSchema.methods.Age = function () {
  const prefix = '20';
  const yearOfBirth = prefix + this.child.carnet.toString().substr(0, 2);// quiza hacer mes y año, convertir a fecha y diferencia entre fechas
  const nowDate = new Date();
  const currentYear = nowDate.getFullYear();
  const ageResult = currentYear - Number(yearOfBirth);
  this.child.age = ageResult < 1 ? 1 : ageResult;
};


module.exports = mongoose.model('submision', SubmisionSchema);
