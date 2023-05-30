const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CirculoSchema = new Schema(
  {
    number: {
      type: Number,
      unique: true,
      required: true,
      min: 1,
      max: 9999,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 50,
    },
    circulotype: {
      type: String,
      enum: ['rural', 'urbano'],
      default: 'urbano',
    },
    normed_capacity2: {
      type: Number,
      required: true,
      default: 0,
    },
    normed_capacity3: {
      type: Number,
      required: true,
      default: 0,
    },
    normed_capacity4: {
      type: Number,
      required: true,
      default: 0,
    },
    normed_capacity5: {
      type: Number,
      required: true,
      default: 0,
    },
    normed_capacity6: {
      type: Number,
      default: 0,
    },

    matricula2: {
      type: Number,
      default: 0,
    },
    matricula3: {
      type: Number,
      default: 0,
    },
    matricula4: {
      type: Number,
      default: 0,
    },
    matricula5: {
      type: Number,
      default: 0,
    },
    matricula6: {
      type: Number,
      default: 0,
    },

    attendance2: {
      type: Number,
      default: 0,
    },
    attendance3: {
      type: Number,
      default: 0,
    },
    attendance4: {
      type: Number,
      default: 0,
    },
    attendance5: {
      type: Number,
      default: 0,
    },
    attendance6: {
      type: Number,
      default: 0,
    },

    calculated_capacity2: {
      type: Number,
      default: 0,
    },
    calculated_capacity3: {
      type: Number,
      default: 0,
    },
    calculated_capacity4: {
      type: Number,
      default: 0,
    },
    calculated_capacity5: {
      type: Number,
      default: 0,
    },
    calculated_capacity6: {
      type: Number,
      default: 0,
    },

    girls2: {
      type: Number,
      default: 0,
    },
    girls3: {
      type: Number,
      default: 0,
    },
    girls4: {
      type: Number,
      default: 0,
    },
    girls5: {
      type: Number,
      default: 0,
    },
    girls6: {
      type: Number,
      default: 0,
    },

    latlng: {
      type: Array,
      maxItems: 2,
    },

    isCiActive: {
      type: Boolean,
      default: true,
    },
    curso: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CirculoSchema.pre('save', function (next) {
  this.calculateCapacity();
  next();
});

CirculoSchema.methods.calculateCapacity = function () {
  const years = [2,3,4,5,6]

  years.map(year => {
    return  this.attendance[year] >=1 && this.attendance[year] <= 80
    ? (this.calculated_capacity[year] = Math.floor(this.normed_capacity[year] * 1.2))
    : (this.calculated_capacity[year] = this.normed_capacity[year]);
  });
};

module.exports = mongoose.model('circulo', CirculoSchema);