const Submision = require("../../schemas/submision.schema");
const { SubmisionFormValidations } = require("../../validations/NewSubmisionForm.validations");


const AddSubmision = async (req, res) => {
    // validar datos del formulario no empty y validos
    const { errors, isValid } = SubmisionFormValidations(req.body);
    if (!isValid) {return res.status(400).json(errors);}

    // validar que no exista planilla
    const existsSubById = await Submision.findById(req.body._id).exec();
    if (existsSubById) return res.status(409).json({ message: 'Ya existe un Submision con ese id registrado'});

    // Validar que no exista una planilla con el mismo numero y la misma fecha
    const existsByNumberAndDate = await Submision.findOne({ entryNumber: req.body.entryNumber, date: req.body.date }).exec();
    if (existsByNumberAndDate) return res.status(409).json({ message:'Ya existe un Submision con ese numero registrado en esa fecha especifica'});
  
    // validar que no exista niño
    const existsByCarnet = await Submision.findOne({ "child.carnet": req.body.child.carnet }).exec();
    if (existsByCarnet && existsByCarnet._id !== req.params.id) return res.status(409).json({ message: 'Ya existe un niño con ese numero de carnet'});

    try {
        //  crear submision
        const submision = await Submision.create(req.body);
        res.status(201).json({message: 'Submision creada con éxito', submision});
    } catch (err) {
        res.status(500).json({
          message: 'Error al crear submision',
          error: err.message
        });
      }
};

module.exports = {AddSubmision};

