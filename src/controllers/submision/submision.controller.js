const Submision = require('../../schemas/submision.schema');
const Tools = require('../../schemas/tools.schema');

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json new Submision added
 */

const AddSubmision = async (req, res) => {
  // Validar que no exista un niño con el mismo numero de carnet
  const carnetExist = await Submision.findOne({ 'child.carnet': req.body.child.carnet });
  if (carnetExist) {
    const error = new Error();
    error.status = 409;
    error.message = 'Error al guardar la planilla, ya existe un niño con ese carnet';
    throw error;
  }

  //  crear submision
  const submision = new Submision(req.body);

   const submisionNueva = await submision.save();
  if (!submisionNueva) {
    const error = new Error();
    error.message = 'Error al guardar planilla';
    throw error;
  }
  const consecutivo = req.body.entryNumber;
  await Tools.updateOne({ uniqueValue: 'tools' }, { $set: { consecutive: consecutivo } });
  res.status(201).send(submision).json({ message: 'Planilla creada' });
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json Submision List
 */
const FindAllSubmisions = async (req, res) => {
  const submisions = await Submision.find({}).populate('ciPedido', 'name').populate('child.parents[0].organismo', 'name').populate('createdBy');
  if (!submisions) {
    const error = new Error();
    error.status = 404;
    error.message = 'No hay planillas para mostrar';
    throw error;
  }
  return res.status(200).json(submisions);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json Submision by Id
 */
const FindSingleSubmision = async (req, res) => {
  if (!req.params.id) {
    const error = new Error();
    error.status = 400;
    error.message = 'Id no válido';
    throw error;
  }

  const submision = await Submision.findById(req.params.id);
  if (!submision) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró la planilla que busca';
    throw error;
  }
  return res.status(200).json(submision);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res status 200 and json Submision updated
 */
const UpdateSubmision = async (req, res) => {
  const submision = await Submision.findById(req.params.id);
  if (!submision) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró la planilla';
    throw error;
  }

  if (submision.child.carnet !== req.body.child.carnet) {
    // Validar que no exista un niño con el mismo numero de carnet
    const carnetExist = await Submision.findOne({ 'child.carnet': req.body.child.carnet });
    if (carnetExist) {
      const error = new Error();
      error.status = 409;
      error.message = 'Error al guardar la planilla, ya existe un niño con ese carnet';
      throw error;
    }
  }

// Si ha editado una planilla para que tenga un parent unico
if (submision.child.parents && submision.child.parents.length > 0 && req.body.child.parents[0].uniqueParent) {
  // Eliminar el segundo objeto del arreglo parents
  req.body.child.parents = req.body.child.parents.slice(0, 1);
}

  const updatedSubmision = await Submision.findByIdAndUpdate(req.params.id, req.body, { new: true });
  await updatedSubmision.calculateWeight();
  await updatedSubmision.Gender();
  await updatedSubmision.Age();
  return res.status(200).send(updatedSubmision);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res status 204 no data
 */
const DeleteSubmision = async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  // return res.status(400).json({ message: 'ID inválido' });

  const submision = await Submision.findById(req.params.id);
  if (!submision) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró la planilla';
    throw error;
  }
  await Submision.findByIdAndDelete(req.params.id);

  return res.sendStatus(204);
};

module.exports = { AddSubmision, FindAllSubmisions, FindSingleSubmision, UpdateSubmision, DeleteSubmision };
