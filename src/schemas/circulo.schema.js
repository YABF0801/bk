const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CirculoSchema = new Schema(
  {
    number: {
      type: Number,
      unique: true,
      required: true,
      min: 1,
      max: 999
    },
    name: {
      type: String,
      required: true,
      unique:true,
      minLength: 4, 
      maxLength: 30
    },
    normed_capacity2: {
      type: Number,
      required: true,
      default: 0
    },
    normed_capacity3: {
      type: Number,
      required: true,
      default: 0
    },
    normed_capacity4: {
      type: Number,
      required: true,
      default: 0
    },
    normed_capacity5: {
      type: Number,
      required: true,
      default: 0
    },
    normed_capacity6: {
      type: Number,
      required: true,
      default: 0
    },

    matricula2: {
      type: Number,
      default: 0
    },
    matricula3: {
      type: Number,
      default: 0
    },
    matricula4: {
      type: Number,
      default: 0
    },
    matricula5: {
      type: Number,
      default: 0
    },
    matricula6: {
      type: Number,
      default: 0
    },
    girls2: {
      type: Number,
    },
    girls3: {
      type: Number,
    },
    girls4: {
      type: Number,
    },
    girls5: {
      type: Number,
    },
    girls6: {
      type: Number,
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

    isCiActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('circulo', CirculoSchema);

