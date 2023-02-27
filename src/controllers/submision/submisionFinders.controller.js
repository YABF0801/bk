const mongoose = require('mongoose');
const Submision = require('../../schemas/submision.schema');

const FindAllSubmisions = async (req, res) => {
  try {
    const submisions = await Submision.find().sort({date: -1, entryNumber: 1}).exec();

      if(!submisions) return res.status(404).send({message: "No hay planillas para mostrar"});

    return res.status(200).json(submisions);
  } catch (error) {
    return res.status(500).json({ message: "Error al extraer los datos de las planillas", error });
  }
};

const FindSingleSubmisionByNumber = async (req, res) => {
  try {
    if (!req.params.entryNumber) return res.status(400).json({ message: "No se ha especificado un numero" });

    const submision = await Submision.findOne({ entryNumber: req.params.entryNumber }).exec();
    if (!submision) return res.status(404).json({ message: "No se encontró una Submision con ese numero" });

    return res.status(200).json(submision);
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar la Submision", error });
  }
};

const FindSingleSubmisionById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID enviado no es válido' });}
 
  const submision = await Submision.findById(req.params.id).exec();
  if (!submision) return res.status(404).send({ errors: ['No encuentro la planilla que busca'] });
  
  return res.status(200).send(submision);
}catch (error) {
  return res.status(500).json({ message: "Error al buscar la planilla", error });
}
};

module.exports = { FindAllSubmisions, FindSingleSubmisionByNumber, FindSingleSubmisionById };