const Submision = require('../schemas/submision.schema');
const { EvaluateAndAsign } = require('./EvaluateAndAsign');
const Tools = require("../schemas/tools.schema");
const { ProyectarMatriculas, CirculosCopia } = require("./Utiles");

// orden de prioridad = el valor de weight de cada submisión
const GenerarPropuestas = async (req, res) => {
  // Buscar el documento 'tools' que contiene la fecha de otorgamiento guardada
const tools = await Tools.findOne({ uniqueValue: "tools" });

// Obtener todas las submisions que cumplen con los criterios de búsqueda
const submisions = await Submision.find({
  createdAt: { $lte: tools.omDate },  // Fecha de creación anterior a la fecha guardada
  status: 'pendiente',   // Estado 'pendiente'
  finality: 'om', // Finalidad 'om'
});

  if (!submisions) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encuentran planillas pendientes para otorgamiento masivo';
    throw error;
  }

  // insertar las submisions en la cola de prioridades ordenadas por peso y fecha, mayor peso primero
  const submisionsQueue = submisions.sort((a, b) => b.weight - a.weight);

  // paso el arreglo de circulos correspondiente dependiendo de la gen de prop
  let circulosArray;
  if (tools.contadorGP !== 0) {
    await CirculosCopia(req, res);
    circulosArray = tools.circulosParaGP;
  } else {
    await ProyectarMatriculas(req, res);
    circulosArray = tools.proyeccionParaGP;
  }

  const Generar = async (submisionPrioritaria, circulosArray) => {
    try {
      await EvaluateAndAsign(submisionPrioritaria, circulosArray);
    } catch (error) {
      console.error(error);
    }
  };

  // Iterar sobre la cola de prioridades y llamar a la función handleAsync para cada elemento
  for (const submisionPrioritaria of submisionsQueue) {
    await Generar(submisionPrioritaria, circulosArray);
  }

  // sacar el elemento con el valor maximo (el de mayor prioridad) para evaluar y crear propuesta
  /* for (const submisionPrioritaria of submisionsQueue) { // Revisar si el circulo mas cercano tiene capacidad y asignarlo 
   await EvaluateAndAsign(submisionPrioritaria, circulosArray);
  }  */
  res.status(200).json({ message: 'Propuestas generadas con exito ' });

};

module.exports = { GenerarPropuestas };

