const Circulo = require('../../schemas/circulo.schema');

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json new Circulo added
 */
const AddCirculo = async (req, res) => {
  const ciNumberExist = await Circulo.findOne({ number: req.body.number });
  const ciNameExist = await Circulo.findOne({ name: { $regex: new RegExp(req.body.name, 'i') } });
  if (ciNumberExist || ciNameExist) {
    const error = new Error();
    error.status = 409;
    error.message = 'Error al guardar el circulo, ya existe un circulo con ese numero o nombre';
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

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json Circulo List
 */
const FindAllCirculos = async (req, res) => {
  const circulos = await Circulo.find({});
  if (!circulos) {
    const error = new Error();
    error.status = 404;
    error.message = 'No hay círculos para mostrar';
    throw error;
  }
  return res.status(200).json(circulos);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json one Circulo by Id
 */
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

/**
 * @param  {} req
 * @param  {} res
 * @return {} res status 200 and json Circulo updated
 */
const UpdateCirculo = async (req, res) => {
  const circulo = await Circulo.findById(req.params.id);
  if (!circulo) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el círculo';
    throw error;
  }

  if (circulo.number !== req.body.number) {
    const ciNumberExist = await Circulo.findOne({ number: req.body.number });
    if (ciNumberExist) {
      const error = new Error();
      error.status = 409;
      error.message = 'Error al guardar el circulo, ya existe un circulo con ese numero ';
      throw error;
    }
  }

  if (circulo.name !== req.body.name) {
    const ciNameExist = await Circulo.findOne({ name: { $regex: new RegExp(req.body.name, 'i') } });
  if (ciNameExist) {
    const error = new Error();
    error.status = 409;
    error.message = 'Error al guardar el circulo, ya existe un circulo con ese  nombre';
    throw error;
  }   }

  const updatedCirculo = await Circulo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  await updatedCirculo.calculateCapacity();
  return res.status(200).send(updatedCirculo);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res status 204 no data
 */
const DeleteCirculo = async (req, res) => {
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
