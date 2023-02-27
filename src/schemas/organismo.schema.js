const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganismoSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2, 
    maxLength: 30
  },
  description: {
    type: String,
    required: true,
    minLength: 10, 
    maxLength: 80
  },
  priorizado: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
    default: 0,
  },
},{
  timestamps: true,
  versionKey: false,
});

OrganismoSchema.pre('save', function(next) {
  if (this.priorizado === true) {
    this.weight = 2;
  }
  next();
});

module.exports = mongoose.model('organismo', OrganismoSchema);
