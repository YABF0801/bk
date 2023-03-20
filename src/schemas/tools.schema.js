const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToolsSchema = new Schema(
  {
    uniqueValue: { 
        default: "tools",
        unique: true
    },

    consecutive: { // almacenar numero consecutivo para las submisions
        type: Number,
        default: 0,
        unique: true,
      },
    
      omDate: { // almacenar la fecha limite de recepcion de solicitudes para el otorgamiento masivo y comenzar a generar propuestas
        type: Date,
        unique: true,
      },

      contadorGP: { // contador para almacenar cuantas veces se han generado las propuestas antes de cerrar el otorgamiento
        type: Number,
        default: 0,
        unique: true,
      }
  },
);

module.exports = mongoose.model('tools', ToolsSchema);


