const mongoose = require("mongoose");
const Submision = require("../../schemas/submision.schema");
// const { SubmisionFormValidations } = require("../../validations/NewSubmisionForm.validations");

const AddSubmision = async (req, res) => {
    //  const { errors, isValid } = SubmisionFormValidations(req.body);
    // if (!isValid) {return res.status(400).json(errors);}

    // Validar que no exista una planilla con el mismo numero y la misma fecha
    const existsByNumberAndDate = await Submision.findOne({ entryNumber: req.body.entryNumber, date: req.body.date }).exec();
    if (existsByNumberAndDate) {
      const error = new Error();
      error.message = 'Error al guardar la planilla, ya existe';
      throw error;
    }

    //  crear submision
    const submision = await Submision.create(req.body);
    res.status(201).send(submision).json({ message: 'Planilla creada con éxito' });
};

const FindAllSubmisions = async (req, res) => {
      // Obtener todas las planillas 
      const submisions = await Submision.find().sort({date: -1});
      if(!submisions) {
        const error = new Error();
        error.status = 404;
        error.message = 'No hay planillas para mostrar';
        throw error;
      }
      return res.status(200).json(submisions);
      };


const FindSingleSubmision = async (req, res) => {
      if (!req.params.id) {
      const error = new Error();
      error.status = 400;
      error.message = 'Id no valido';
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


const UpdateSubmision = async (req, res) => {
     // const { errors, isValid } = SubmisionFormValidations(req.body);
     // if (!isValid) {return res.status(400).json(errors);}
      
     const submision = await Submision.findById(req.params.id);
      if (!submision) {
        const error = new Error();
        error.status = 404;
        error.message = 'No se encontró la planilla';
        throw error;
      }
      
          // buscar submision en BD por numero y fecha
          /* const existsByNumber = await Submision.findOne({ entryNumber: req.body.entryNumber });
          const existsByDate = await Submision.findOne({ date: req.body.date });

          if (existsByNumber && existsByDate && existsByNumber._id !== req.params.id)  {
            const error = new Error();
            error.message = 'Ya existe una planilla con ese número en esa fecha';
            throw error;
          } */
      
          // Find and update Submision by id
          const updatedSubmision = await Submision.findByIdAndUpdate (req.params.id, req.body, { new: true });
      
          return res.status(200).send(updatedSubmision,);
   };
      

   const DeleteSubmision = async (req, res) => {
        // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        // return res.status(400).json({ message: 'ID inválido' });

        const deletedSubmision = await Submision.findById(req.params.id);
        if (!deletedSubmision) {
          const error = new Error();
          error.status = 404;
          error.message = 'No se encontró la planilla';
          throw error;
        }
        await Submision.findByIdAndDelete(req.params.id);

        return res.sendStatus(204);
  };

module.exports = {AddSubmision, FindAllSubmisions, FindSingleSubmision, UpdateSubmision, DeleteSubmision };

