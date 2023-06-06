const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganismoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    priorizado: {
      type: Boolean,
      default: false,
    },
    weight: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

OrganismoSchema.pre('save', function (next) {
  this.calculateWeight();
  next();
});


OrganismoSchema.methods.calculateWeight = function () {
  let weight = 0;
  this.priorizado === true ? weight += 2 : weight = 0;
  this.weight = weight;
};

module.exports = mongoose.model('organismo', OrganismoSchema);
