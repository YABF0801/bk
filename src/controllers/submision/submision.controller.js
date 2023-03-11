const Submision = require("../../schemas/submision.schema");

function compareDates (date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const year1 = d1.getFullYear();
  const year2 = d2.getFullYear();
  return year1 === year2;
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json new Submision added
 */
const AddSubmision = async (req, res) => {

    // Validar que no exista una planilla con el mismo numero y la misma fecha 
    const now = new Date(); // fecha actual

    const numberExist = await Submision.findOne({ entryNumber: req.body.entryNumber});
    if (numberExist) {
      const yearsEqual = compareDates(numberExist.createdAt, now);
      if (yearsEqual) {
      const error = new Error();
      error.status = 409;
      error.message = 'Error al guardar la planilla, ya existe';
      throw error;
      } 
    }

    //  crear submision
    const submision = new Submision(req.body);
      const submisionNueva = await submision.save();
      if (!submisionNueva) {
        const error = new Error();
        error.message = 'Error al guardar planilla';
        throw error;
      }
      res.status(201).send(submision).json({ message: 'Planilla creada' });
    };

 /**
 * @param  {} req
 * @param  {} res
 * @return {} res and json Submision List 
 */
const FindAllSubmisions = async (req, res) => {
      const submisions = await Submision.find({});
      if(!submisions) {
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
      
          const updatedSubmision = await Submision.findByIdAndUpdate(req.params.id, req.body, { new: true });
          return res.status(200).send(updatedSubmision,);
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

module.exports = {AddSubmision, FindAllSubmisions, FindSingleSubmision, UpdateSubmision, DeleteSubmision };