const mongoose = require('mongoose');
const Organismo = require('../../schemas/organismo.schema');
const organismoDataValidation = require('../../validations/organismo.validations');


const AddOrganismo = async (req, res) => {
  const { errors, isDataValid } = await organismoDataValidation(req.body);
  if (!isDataValid) return res.status(400).json(errors);

    const existsById = await Organismo.findById(req.body._id).exec();
    if (existsById) return res.status(409).json({ message:'Ya existe un organismo con ese id registrado'});
    
    const existsByName = await Organismo.findOne({ name: req.body.name }).exec();
    if (existsByName) return res.status(409).json({ message: 'Ya existe un organismo con ese nombre registrado'});

    const organismo = new Organismo(req.body);
    organismo.save(function(err, organismo) {
    if (err) {
    return res.status(500).send({ message: "Error al guardar organismo" });
    }
    if (!organismo) {
    return res.status(404).send({ message: "No se ha podido guardar organismo" });
    }
  res.status(201).send(organismo).json({ message: 'Organismo creado' });
  })
};

const FindAllOrganismos = async (req, res) => {
  try {
    // Obtener todos los organismos y ordenarlos por nombre
    const organismos = await Organismo.find({}).sort({ name: 1 });
    if (!organismos) return res.status(404).send({ message: "No hay organismos para mostrar" });
    return res.status(200).json(organismos);
  } catch (error) {
    return res.status(500).json({ message: "Error al extraer los datos", error });
  }
};

const FindSingleOrganismo = async (req, res) => {
  try {
    if (!req.params.name) return res.status(400).json({ message: "No se ha especificado un nombre" });

    const organismo = await Organismo.findOne({ name: req.params.name }).exec();
    if (!organismo) return res.status(404).json({ message: "No se encontró el organismo con ese nombre" });

    return res.status(200).json(organismo);
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar el organismo", error });
  }
};

const UpdateOrganismo = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID enviado no es válido' });
    }

    const { errors, isDataValid } = await organismoDataValidation(req.body);
    if (!isDataValid) return res.status(400).json(errors);

    const organismo = await Organismo.findById(req.params.id).exec();
    if (!organismo) return res.status(404).send({ message: "No se encontró el Organismo" });

    const existsByName = await Organismo.findOne({ name: req.body.name }).exec();
    if (existsByName && existsByName._id !== req.params.id) 
      return res.status(409).send({ message: "Ya existe un Organismo con ese nombre" });

    const updatedOrganismo = await Organismo.findByIdAndUpdate (req.params.id, req.body, { new: true }).exec();
    return res.status(200).send(updatedOrganismo);
  } catch (error) {
    return res.status(500).send({ message: "Error al actualizar el Organismo" });
  }
};

const DeleteOrganismo = async (req, res) => {
  try {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ message: 'ID inválido' });
  }
  const deletedOrganismo = await Organismo.findByIdAndDelete(req.params.id).exec();
  if (!deletedOrganismo) return res.status(404).json({ message: 'No se encontró el Organismo' });
  return res.status(200).json({ message: 'Organismo eliminado', deletedOrganismo });
  } catch (error) {
  return res.status(500).json({ message: "Error al eliminar el Organismo", error });
  }
  };

module.exports = { AddOrganismo, FindAllOrganismos, FindSingleOrganismo, UpdateOrganismo, DeleteOrganismo};