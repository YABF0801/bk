const Heap = require('heap');
const Submision = require('../schemas/submision.schema');
const { EvaluateAndAsign } = require('./EvaluateAndAsign');

// orden de prioridad = el valor de weight de cada submisión
const GenerarPropuesta = async (req, res) => {
        // Obtener todas las submisiones con status 'pendiente' y finality 'om'
        const submisions = await Submision.find({ status: 'pendiente', finality: 'om' });

        // Inicializar el heap como un min heap
        const submisionsQueue = new Heap((a, b) => a.weight - b.weight);

        // insertar las submisiones en la cola de prioridades
        submisions.forEach(submision => submisionsQueue.push(submision));

        res.status(201).json({ message: 'Submisions ordenadas por prioridad', submisionsQueue});

        // evaluar y asignar a todos en la cola
    while (submisionsQueue.size > 0) {
        // sacar el elemento con el valor maximo (el de mayor prioridad)
        const submisionPrioritaria = submisionsQueue.popMax();
        await EvaluateAndAsign(submisionPrioritaria);
        }
};

module.exports = {GenerarPropuesta};
