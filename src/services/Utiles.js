const Tools = require('../schemas/tools.schema');

// Funcion para guardar fecha
const AddOmDate = async (req, res) => {
    try {
        const date = new Date(req.body.date);
        const filter = { uniqueValue: "tools" }; // filtro para econtrar el documento
        await Tools.updateOne(filter, { $set: { omDate: date }});
        res.status(200).json({ message: 'La fecha se ha actualizado correctamente.' });
  } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la fecha.' });
  }
};

// Funcion para resetear fecha
const ResetOmDate = async (req, res) => {
    try {
        const filter = { uniqueValue: "tools" };
        await Tools.updateOne(filter, {$set: {omDate: ''}});
        res.status(200).json({ message: 'La fecha ha sido reseteada correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear la fecha.' });
  }
};
  
  
  
  
  module.exports = { AddOmDate, ResetOmDate };