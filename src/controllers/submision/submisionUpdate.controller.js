const mongoose = require("mongoose");
const Submision = require("../../schemas/submision.schema");
const { SubmisionFormValidations } = require("../../validations/NewSubmisionForm.validations");

const UpdateSubmision = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID enviado no es válido' }); }

    // validar datos del formulario
    const { errors, isValid } = SubmisionFormValidations(req.body);
    if (!isValid) {return res.status(400).json(errors);}

    // buscar submision en BD por id
    const submision = await Submision.findById(req.params.id).exec();
    if (!submision) return res.status(404).send({ message: "No se encontró la planilla" });

    // buscar submision en BD por numero y fecha
    const existsByNumber = await Submision.findOne({ entryNumber: req.body.entryNumber }).exec();
    const existsByDate = await Submision.findOne({ date: req.body.date }).exec();
    if (existsByNumber && existsByDate && existsByNumber._id !== req.params.id) 
      return res.status(409).send({ message: "Ya existe una planilla con ese número en esa fecha" });

    // buscar child en BD
    const existsByCarnet = await Submision.findOne({ "child.carnet": req.body.child.carnet }).exec();
    if (existsByCarnet && existsByCarnet._id !== req.params.id) return res.status(409).send({ message: "Ya existe un niño con ese número de carnet" });

    // Find and update Submision by id
    const updatedSubmision = await Submision.findByIdAndUpdate (req.params.id, req.body, { new: true }).exec();

    return res.status(200).send({
        message: "Planilla actualizada correctamente", updatedSubmision,
});
} catch (error) {
return res.status(500).send({ message: "Error al actualizar la planilla", error });
}
};

module.exports = {UpdateSubmision};