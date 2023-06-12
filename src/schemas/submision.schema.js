const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enums = {
  finalityEnum: ['os', 'om'],
  submisiontypeEnum: ['nueva', 'traslado'],
  statusEnum: ['pendiente', 'propuesta', 'matricula', 'baja'],
  sexEnum: ['masculino', 'femenino'],
  typeParentEnum: ['madre', 'padre', 'tutor'],
  occupationEnum: ['trabajador', 'jubilado', 'asistenciado', 'estudiante'],
  specialSituationEnum : ['pregnant', 'deaf']
};

const SubmisionSchema = new Schema(
  {
    finality: {
      type: String,
      enum: enums.finalityEnum,
      default: 'om',
    },
    submisiontype: {
      type: String,
      enum: enums.submisiontypeEnum,
      default: 'nueva',
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
      enum: enums.statusEnum,
      default: 'pendiente',
    },
    ciPedido: {
      type: String,
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
      },
      childLastname: {
        type: String,
        required: true,
        minLength: 2,
      },
      carnet: {
        type: Number,
        required: true,
        unique: true,
      },
      sex: {
        type: String,
        enum: enums.sexEnum,
      },
      age: {
        type: Number,
        min: 0,
        max: 6,
      },
      year_of_life: {
        type: Number,
        required: true,
      },
      childAddress: {
        type: String,
        required: true,
        minLength: 5,
      },
      neighborhood: {
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'circulo',
        select: ['_id', 'name'],
      },

      matriculaDate: {
        type: String,
      },

      latlng: {
        type: Array,
        maxItems: 2,
      },

      parents: {
        type: Array,
        maxItems: 2,

        parentName: {
          type: String,
          required: true,
          minLength: 2,
        },
        parentLastname: {
          type: String,
          required: true,
          minLength: 2,
        },
        // 1
        uniqueParent: {
          type: Boolean,
          default: false,
        },
        typeParent: {
          type: String,
          enum: enums.typeParentEnum,
          default: 'madre',
        },
        convivencia: {
          type: Boolean,
          default: true,
        },
        parentAddress: {
          type: String,
          minLength: 2,
        },
        phoneNumber: {
          type: String,
          required: true,
          minLength: 8,
          maxLength: 15,
        },
        occupation: {
          type: String,
          enum: enums.occupationEnum,
          default: 'trabajador',
        },
        workName: {
          type: String,
          required: true,
          minLength: 2,
        },
        workAddress: {
          type: String,
          required: true,
          minLength: 2,
        },
        jobTitle: {
          type: String,
          minLength: 2,
        },
        // 1
        organismo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'organismo',
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
          type: String,
        },
        // 1
        // specialSituation: {
        //   type: String,
        //   enum: enums.specialSituationEnum,
        // },
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
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// hacer todo esto antes de guardar
SubmisionSchema.pre('save', function (next) {
  this.preSaveFunctions();
  next();
});

SubmisionSchema.methods.preSaveFunctions = function () {
  this.calculateWeight();
  this.Gender();
  this.Age();
};

SubmisionSchema.methods.calculateWeight = function () {
  let weight = 0;
  if (this.submisiontype === 'traslado') weight += 36;
  if (this.socialCase === true) weight += 18;
  if (this.child.parents[0].uniqueParent === true) weight += 3;
  if (this.child.parents[0].occupation === 'estudiante') weight += 2;
  if (this.child.parents[0].organismo && this.child.parents[0].organismo.weight === 2) weight += 2;
  // if (this.child.parents[0].specialSituation === 'pregnant') weight += 2;
  // if (this.child.parents[0].specialSituation === 'deaf') weight += 9;
  if (this.child.parents[0].pregnant === true) weight += 2;
  if (this.child.parents[0].deaf === true) weight += 9;
  this.weight = weight;
};

SubmisionSchema.methods.Gender = function () {
  const tenthDigit = this.child.carnet.toString()[9];
  this.child.sex = tenthDigit % 2 === 0 ? 'masculino' : 'femenino';
};

SubmisionSchema.methods.Age = function () {
  const carnet = this.child.carnet.toString();
  const year = parseInt(carnet.substr(0, 2), 10) + 2000;
  const month = parseInt(carnet.substr(2, 2), 10) - 1;
  const day = parseInt(carnet.substr(4, 2), 10);

  const birthDate = new Date(year, month, day);
  const nowDate = new Date();

  let age = nowDate.getFullYear() - birthDate.getFullYear();

  if (
    nowDate.getMonth() < birthDate.getMonth() ||
    (nowDate.getMonth() === birthDate.getMonth() && nowDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 1) {
    const months = nowDate.getMonth() - birthDate.getMonth() + 12 * (nowDate.getFullYear() - birthDate.getFullYear());
    if (nowDate.getDate() >= birthDate.getDate()) {
      this.child.age = months * 0.01;
    } else {
      this.child.age = (months - 1) * 0.01;
    }
  } else {
    this.child.age = age;
  }
};

module.exports = mongoose.model('Submision', SubmisionSchema);
module.exports.enums = enums;
