const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CirculoSchema = new Schema(
  {
    number: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
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
      default: 100,
    },
    attendance3: {
      type: Number,
      default: 100,
    },
    attendance4: {
      type: Number,
      default: 100,
    },
    attendance5: {
      type: Number,
      default: 100,
    },
    attendance6: {
      type: Number,
      default: 100,
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
    this.attendance2 >=1 && this.attendance2 <= 80
      ? (this.calculated_capacity2 = Math.floor(this.normed_capacity2 * 1.2))
      : (this.calculated_capacity2 = this.normed_capacity2);
  
    this.attendance3 >=1 && this.attendance3 <= 80
      ? (this.calculated_capacity3 = Math.floor(this.normed_capacity3 * 1.2))
      : (this.calculated_capacity3 = this.normed_capacity3);
  
    this.attendance4 >=1 && this.attendance4 <= 80
      ? (this.calculated_capacity4 = Math.floor(this.normed_capacity4 * 1.2))
      : (this.calculated_capacity4 = this.normed_capacity4);
  
    this.attendance5 >=1 && this.attendance5 <= 80
      ? (this.calculated_capacity5 = Math.floor(this.normed_capacity5 * 1.2))
      : (this.calculated_capacity5 = this.normed_capacity5);
  
    this.attendance6 >=1 && this.attendance6 <= 80
      ? (this.calculated_capacity6 = Math.floor(this.normed_capacity6 * 1.2))
      : (this.calculated_capacity6 = this.normed_capacity6);
  };

module.exports = mongoose.model('circulo', CirculoSchema);