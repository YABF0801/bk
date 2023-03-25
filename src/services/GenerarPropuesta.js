const Submision = require('../schemas/submision.schema');
const { EvaluateAndAsign } = require('./EvaluateAndAsign');
const Tools = require ("../schemas/tools.schema");
const { ProyectarMatriculas } = require("./Utiles");
const Circulo = require('../schemas/circulo.schema');

// orden de prioridad = el valor de weight de cada submisión
const GenerarPropuestas = async (req, res) => {
    const tools = await Tools.findOne({ uniqueValue: "tools" });
        // Obtener todas las submisiones con status 'pendiente' y finality 'om'
        const submisions = await Submision.find({ 
            status: 'pendiente', 
            finality: 'om' , 
            createdAt: { $lte: tools.omDate }});

        // insertar las submisiones en la cola de prioridades ordenadas por peso y fecha, mayor peso primero
        const submisionsQueue = submisions.sort((a, b) => b.weight - a.weight);

            // paso el arreglo de circulos correspondiente dependiendo de la gen de prop
        let circulosArray;
        tools.contadorGP <= 0 ? circulosArray = await ProyectarMatriculas() : circulosArray = await Circulo.find({});  

       // sacar el elemento con el valor maximo (el de mayor prioridad) para evaluar y crear propuesta
       for (const submisionPrioritaria of submisionsQueue) { // Revisar si el circulo mas cercano tiene capacidad y asignarlo 
        await EvaluateAndAsign(submisionPrioritaria, circulosArray);
       } res.status(200).json({ message: 'Propuestas generadas con exito '});
};

module.exports = {GenerarPropuestas};


/* let submisionPrioritaria = submisionsQueue.shift();
for (const submision of submisionsQueue) { */