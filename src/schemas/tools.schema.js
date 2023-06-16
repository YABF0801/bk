const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToolsSchema = new Schema(
  {
    uniqueValue: {
        type: String,
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
      },

      contadorCC: { // contador para cambio de curso 
        type: Number,
        default: 0,
        unique: true,
      },

      contadorAcept: { // contador para aceptar las primeras propuestas antes del cambio de curso 
        type: Number,
        default: 0,
        unique: true,
      },

      circulosParaGP: { // array de circulos copia de la basse de datos real para generar propuestas
        type: Array,
      },

      proyeccionParaGP: { // array de circulos con proyeccionn de matriculas de datos real para generar propuestas
        type: Array,
      },

      curso: {
        type: Number
      }
  },
);

module.exports = mongoose.model('tools', ToolsSchema);


