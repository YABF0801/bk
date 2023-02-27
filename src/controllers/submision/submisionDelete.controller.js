const mongoose = require("mongoose");
const Submision = require("../../schemas/submision.schema");

const DeleteSubmision = async (req, res) => {
  try {
      // eslint-disable-next-line no-undef
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
      }
      // find and delete submision by id 
      const deletedSubmision = await Submision.findByIdAndDelete(req.params.id).exec();

      if (!deletedSubmision) return res.status(404).json({ message: 'No se encontró la Submision'});
      
      return res.status(200).json({ message: 'Submision eliminada con exito', deletedSubmision });

  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar Submision", error });
    }
};

module.exports = {DeleteSubmision}