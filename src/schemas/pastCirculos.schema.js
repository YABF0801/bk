const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PastCirculosSchema = new Schema(
  {
    year: {
      type: Number,
      unique: true,
      required: true,
    },
    circulos: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model('pastCirculos', PastCirculosSchema);
