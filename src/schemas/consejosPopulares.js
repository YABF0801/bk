const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsejoSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model('consejo', ConsejoSchema);
