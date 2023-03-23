const Submision = require("../schemas/submision.schema");
const Circulo = require("../schemas/circulo.schema"); 

/* const AceptarPropuesta = require('../services/aceptarPropuesta'); */
/* router.post('/aceptarPropuesta', AceptarPropuesta);  */

const AceptarPropuesta = async (req, res) => {
  const { aprobadas } = req.body; // obetener el arreglo de las sumisions aprobadas que se envia desde el frontend
  if (!Array.isArray(aprobadas) || aprobadas.length === 0) {
    return res.status(400).json({ message: 'el arreglo rechazadas no es correcto o esta vacio' });
  }

  const now = new Date();

  try {
      // Obtener las submisions del arreglo de propuestas aceptadas
      const submisionsAprobadas = await Submision.find({_id: { $in: aprobadas, status: 'propuesta' }}).populate('child.circulo');

      for (const submisionAprobada of submisionsAprobadas) {
        if (!submisionAprobada) {
          const error = new Error();
          error.status = 404;
          error.message = 'No se encontró la planilla para matricular';
          throw error;
          }

      const circulo = submisionAprobada.child.circulo;
        if (!circulo) {
          const error = new Error();
          error.status = 404;
          error.message = 'No se encontró el circulo propuesto en la planilla';
          throw error;
          }

      const yearOfLife = submisionAprobada.child.year_of_life;
      const sex = submisionAprobada.child.sex;
      if (sex === 'femenino') {
        await Circulo.updateOne({ _id: circulo._id }, { $inc: { [`matricula${yearOfLife}`]: 1, [`girls${yearOfLife}`]: 1 }});
      } else {
        await Circulo.updateOne({ _id: circulo._id }, { $inc: { [`matricula${yearOfLife}`]: 1 }});
      }

    await submisionAprobada.updateOne({$set: { status: 'matricula', matriculaDate: now },
      });
    }

    res.status(200).json({ message: 'Propuestas aceptadas matriculadas con exito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar las propuestas' });
  }
};



/* const RechazarPropuesta = require('../services/rechazarPropuesta'); */
/* router.post('/rechazarPropuesta', RechazarPropuesta);  */

const RechazarPropuesta = async (req, res) => {
  const { rechazadas } = req.body; // obtener el arreglo de las sumisions rechazadas que se envia desde el frontend
  if (!Array.isArray(rechazadas) || rechazadas.length === 0) {
    return res.status(400).json({ message: 'el arreglo rechazadas no es correcto o esta vacio' });
  }

  try {
      // Obtener las submisions del arreglo de propuestas aceptadas
      const submisionsRechazadas = await Submision.find({ _id: { $in: rechazadas }, status: 'propuesta' });

      if (!submisionsRechazadas) {
        const error = new Error();
        error.status = 404;
        error.message = 'No hay propuestas a rechazar';
        throw error;
        }

      await Submision.updateMany({ _id: { $in: submisionsRechazadas }}, { $set: { status: 'pendiente', 'child.circulo': {} }}); 

      res.status(200).json({ message: 'Propuestas rechazadas reestablecidas a pendiente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar las propuestas' });
  }
};


const Baja = async (req, res) => {
  try {
    
 
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