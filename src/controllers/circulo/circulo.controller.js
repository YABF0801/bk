const mongoose = require('mongoose');
const Circulo = require('../../schemas/circulo.schema');

const AddCirculo = async (req, res) => {
  // const { errors, isDataValid } = await circuloDataValidation(req.body);
  // if (!isDataValid) return res.status(400).json(errors);

  const circulo = new Circulo(req.body);
  const circuloNuevo = await circulo.save();
  if (!circuloNuevo) {
    const error = new Error();
    error.message = 'Error al guardar el círculo';
    throw error;
  }

  res.status(201).send(circulo).json({ message: 'Círculo creado' });
};

const FindAllCirculos = async (req, res) => {
    // Obtener todos los circulos 
    const circulos = await Circulo.find({});
    if (!circulos) {
      const error = new Error();
      error.status = 404;
      error.message = 'No hay círculos para mostrar';
      throw error;
    }
    return res.status(200).json(circulos);
};

const FindSingleCirculo = async (req, res) => {
  if (!req.params.id) {
    const error = new Error();
    error.status = 400;
    error.message = 'Id no valido';
    throw error;
  }

    const circulo = await Circulo.findById(req.params.id);
    if (!circulo) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encontró el círculo que busca';
      throw error;
    }
    return res.status(200).send(circulo);
};

const UpdateCirculo = async (req, res) => {
  // const { errors, isDataValid } = await organismoDataValidation(req.body);
  // if (!isDataValid) return res.status(400).json(errors);

  const circulo = await Circulo.findById(req.params.id);
  if (!circulo) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el círculo';
    throw error;
  }
  const updatedCirculo = await Circulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return res.status(200).send(updatedCirculo);
};


const DeleteCirculo = async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   return res.status(400).json({ message: 'ID inválido' });
  // }
  const circulo = await Circulo.findById(req.params.id);
  if (!circulo) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el círculo';
    throw error;
  }
  await Circulo.findByIdAndDelete(req.params.id);
  return res.sendStatus(204);
};


module.exports = {
  AddCirculo,
  FindAllCirculos,
  FindSingleCirculo,
  UpdateCirculo,
  DeleteCirculo,
};
