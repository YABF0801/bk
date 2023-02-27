const { mongoose } = require("mongoose");
const Submision = require("../schemas/submision.schema");


const AceptarPropuesta = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const submision = await Submision.findById(req.params.id).exec();
    submision.status = 'matricula';
    await submision.save();

    } catch (error) {
      res.status(500).json({ message: 'Error al procesar los datos', error });
    }
};

const RechazarPropuesta = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const submision = await Submision.findById(req.params.id).exec();
    const circulo = submision.child.circulo;
    const yearOfLife = submision.child.year_of_life;
    const sex = submision.child.sex;

    submision.child.circulo = { id: null};
      submision.status = 'pendiente';
      await submision.save();

      circulo[`matricula${yearOfLife}`] -= 1;
      if (sex === 'femenino'){
        circulo[`girls${yearOfLife}`] -=1;
      }
      await circulo.save();
      res.status(200).json({ message: 'Propuesta rechazada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar los datos', error });
   }
};

const Baja = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    const submision = await Submision.findById(req.params.id).exec();
    const circulo = submision.child.circulo;
    const yearOfLife = submision.child.year_of_life;
    const sex = submision.child.sex;

      submision.child.circulo = { id: null, name: '' };
      submision.status = 'baja';
      await submision.save();

      circulo[`matricula${yearOfLife}`] -= 1;
      if (sex === 'femenino'){
        circulo[`girls${yearOfLife}`] -=1;
      }
      await circulo.save();
    res.status(200).json({ message: 'Baja procesada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar baja', error });
   }
  };

  module.exports = {AceptarPropuesta, RechazarPropuesta, Baja}