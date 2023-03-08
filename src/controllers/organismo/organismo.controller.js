const mongoose = require('mongoose');
const Organismo = require('../../schemas/organismo.schema');
// const { organismoDataValidation } = require('../../validations/organismo.validations');

const AddOrganismo = async (req, res) => {
  // const { errors, isDataValid } = await organismoDataValidation(req.body);
  // if (!isDataValid) return res.status(400).json(errors);

  const organismo = new Organismo(req.body);
  const organismoNuevo = await organismo.save();
  if (!organismoNuevo) {
    const error = new Error();
    error.message = 'Error al guardar organismo';
    throw error;
  }
  res.status(201).send(organismo).json({ message: 'Organismo creado' });
};

const FindAllOrganismos = async (req, res) => {
    // Obtener todos los organismos 
    const organismos = await Organismo.find({});
    if (!organismos) {
    const error = new Error();
    error.status = 404;
    error.message = 'No hay organismos para mostrar';
    throw error;
  }
  return res.status(200).json(organismos);
};

const FindSingleOrganismo = async (req, res) => {
  if (!req.params.id) {
    const error = new Error();
    error.status = 400;
    error.message = 'Id no  valido';
    throw error;
  }

  const organismo = await Organismo.findById(req.params.id);
  if (!organismo) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el organismo';
    throw error;
  }
  return res.status(200).json(organismo);
};

const UpdateOrganismo = async (req, res) => {
  // const { errors, isDataValid } = await organismoDataValidation(req.body);
  // if (!isDataValid) return res.status(400).json(errors);

  const organismo = await Organismo.findById(req.params.id);
  if (!organismo) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el organismo';
    throw error;
  }

  const updatedOrganismo = await Organismo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return res.status(200).send(updatedOrganismo);
};

const DeleteOrganismo = async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   return res.status(400).json({ message: 'ID inválido' });
  // }
  const organismo = await Organismo.findById(req.params.id);
  if (!organismo) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el organismo';
    throw error;
  }
  await Organismo.findByIdAndDelete(req.params.id);

  return res.sendStatus(204);
};

module.exports = { AddOrganismo, FindAllOrganismos, FindSingleOrganismo, UpdateOrganismo, DeleteOrganismo };