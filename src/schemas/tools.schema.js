const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToolsSchema = new Schema(
  {
    consecutive: { // almacenar numero consecutivo para las submisions
        type: Number,
        default: 0,
        unique: true,
      },
    
      omDate: { // almacenar la fecha limite de recepcion de solicitudes para el otorgamiento masivo y comenzar a generar propuestas
        type: Date,
        unique: true,
      },
  },
);

module.exports = mongoose.model('tools', ToolsSchema);


