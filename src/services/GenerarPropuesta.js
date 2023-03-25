const Heap = require('heap');
const Submision = require('../schemas/submision.schema');
const { EvaluateAndAsign } = require('./EvaluateAndAsign');
const Tools = require ("../schemas/tools.schema");

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

        res.status(201).json({ message: 'Submisions ordenadas por prioridad', submisionsQueue});

        // mientras haya submision en la cola
         while (submisionsQueue.size > 0) {

        // sacar el elemento con el valor maximo (el de mayor prioridad) para evaluar y crear propuesta
        const submisionPrioritaria = submisionsQueue.popMax();
        await EvaluateAndAsign(submisionPrioritaria);
        }
    res.status(200).json({ message: 'Propuestas generadas con exito' });
};

module.exports = {GenerarPropuestas};
