const mongoose = require('mongoose');
const Circulo = require('../../schemas/circulo.schema');
// const { circuloDataValidation } = require('../../validations/circulo.validations');

const AddCirculo = async (req, res) => {
  // const { errors, isDataValid } = await circuloDataValidation(req.body);
  // if (!isDataValid) return res.status(400).json(errors);

  const existsByName = await Circulo.findOne({ name: req.body.name }).exec();
  if (existsByName) {
    const error = new Error();
    error.status = 409;
    error.message = 'Ya existe este círculo';
    throw error;
  }

  const existsByNumber = await Circulo.findOne({ name: req.body.number }).exec();
  if (existsByNumber) {
    const error = new Error();
    error.status = 409;
    error.message = 'Ya existe este número';
    throw error;
  }

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
      error.message = 'No hay Circulos para mostrar';
      throw error;
    }
    return res.status(200).json(circulos);
};

const FindSingleCirculoByName = async (req, res) => {
  try {
    if (!req.params.name) return res.status(400).json({ message: 'No se ha especificado un nombre' });

    const circulo = await Circulo.findOne({ name: req.params.name }).exec();
    if (!circulo) return res.status(404).json({ message: 'No encuentro el Circulo que busca' });

    return res.status(200).json(circulo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar el circulo', error });
  }
};

const FindSingleCirculo = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID enviado no es válido' });
    }

    const circulo = await Circulo.findById(req.params.id).exec();
    if (!circulo) return res.status(404).send({ errors: ['No encuentro el Circulo que busca'] });

    return res.status(200).send(circulo);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar el Circulo', error });
  }
};

const UpdateCirculo = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID enviado no es válido' });
    }

    const { errors, isDataValid } = circuloDataValidation(req.body);
    if (!isDataValid) return res.status(400).json(errors);

    const circulo = await Circulo.findById(req.params.id).exec();
    if (!circulo) return res.status(404).send({ message: 'No se encontró el circulo' });

    const existsByName = await Circulo.findOne({ name: req.body.name }).exec();
    if (existsByName && existsByName._id !== req.params.id)
      return res.status(409).send({ message: 'Ya existe un circulo con ese nombre' });

    const existsByNumber = await Circulo.findOne({ number: req.body.number }).exec();
    if (existsByNumber && existsByNumber._id !== req.params.id)
      return res.status(409).send({ message: 'Ya existe un circulo con ese numero' });

    const updatedCirculo = await Circulo.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
    return res.status(200).send(updatedCirculo);
  } catch (error) {
    return res.status(500).send({ message: 'Error al actualizar el circulo' });
  }
};

const DeleteCirculo = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const deletedCirculo = await Circulo.findByIdAndDelete(req.params.id).exec();
    if (!deletedCirculo) return res.status(404).json({ message: 'No se encontró el círculo' });
    return res.status(200).json({ message: 'Círculo eliminado', deletedCirculo });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el círculo', error });
  }
};

module.exports = {
  AddCirculo,
  FindAllCirculos,
  FindSingleCirculoByName,
  FindSingleCirculo,
  UpdateCirculo,
  DeleteCirculo,
};
