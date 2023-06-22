const Submision = require('../schemas/submision.schema');
const Circulo = require('../schemas/circulo.schema');

const AceptarPropuestas = async (req, res) => {
  const aprobadas = req.body; // obetener el arreglo de las sumisions aprobadas que se envia desde el frontend
  if (!Array.isArray(aprobadas)) {
    return res.status(400).json({ message: 'la selección de aprobadas no es correcta' });
  }
  if (aprobadas.length === 0) {
    return res.status(400).json({ message: 'Ninguna propuesta fue aprobada' });
  }
  
  const now = new Date();

  try {
    // Obtener las submisions del arreglo de propuestas aceptadas
    const submisionsAprobadas = await Submision.find({ _id: { $in: aprobadas }, status: 'propuesta' }).populate(
      'child.circulo'
    );

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
        error.message = 'No se encontró el círculo propuesto en la planilla';
        throw error;
      }

      const yearOfLife = submisionAprobada.child.year_of_life;
      const sex = submisionAprobada.child.sex;
      if (sex === 'femenino') {
        await Circulo.updateOne(
          { _id: circulo._id },
          { $inc: { [`matricula${yearOfLife}`]: 1, [`girls${yearOfLife}`]: 1 } }
        );
      } else {
        await Circulo.updateOne({ _id: circulo._id }, { $inc: { [`matricula${yearOfLife}`]: 1 } });
      }

      await submisionAprobada.updateOne({ $set: { status: 'matricula', 'child.matriculaDate': now } });
    }

    res.status(200).json({ message: 'Las propuestas aceptadas fueron matriculadas con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar las propuestas' });
  }
};

const RechazarPropuesta = async (req, res) => {
  const rechazadas = req.body; // obtener el arreglo de las sumisions rechazadas que se envia desde el frontend
  if (!Array.isArray(rechazadas)) {
    return res.status(400).json({ message: 'La selección de rechazadas no es correcta' });
  }
  try {
    // Obtener las submisions del arreglo de propuestas aceptadas
    const submisionsRechazadas = await Submision.find({ _id: { $in: rechazadas }, status: 'propuesta' });

    if (!submisionsRechazadas) {
      const error = new Error();
      error.status = 404;
      error.message = 'No hay propuestas pendientes';
      throw error;
    }

    await Submision.updateMany(
      { _id: { $in: submisionsRechazadas } },
      {
        $set: {
          status: 'pendiente',
          'child.circulo': {
            _id: '',
            name: '',
          },
        },
      }
    );

    res.status(200).json({ message: 'Propuestas rechazadas reestablecidas a un estado pendiente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar las propuestas' });
  }
};

const MatriculaManual = async (req, res) => {
  const now = new Date();

  try {
    const submision = await Submision.findOne({
      _id: { $eq: req.params.id },
      status: 'pendiente',
      finality: 'os',
    })
    if (!submision) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encontró la planilla o los datos no son correctos';
      throw error;
    }

    const circulo = req.body.child.circulo;
    console.log(circulo)
    if (!circulo) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encuentra el círculo ';
      throw error;
    }

    const yearOfLife = submision.child.year_of_life;
    const sex = submision.child.sex;
    if (sex === 'femenino') {
      /// quitar ._id para probar
      await Circulo.updateOne(
        { _id: circulo._id },
        { $inc: { [`matricula${yearOfLife}`]: 1, [`girls${yearOfLife}`]: 1 } }
      );
    } else {
      await Circulo.updateOne({ _id: circulo._id }, { $inc: { [`matricula${yearOfLife}`]: 1 } });
    }

    await submision.updateOne({ $set: { status: 'matricula', 'child.matriculaDate': now , 'child.circulo' : circulo}  });

    res.status(200).json({ message: 'Matrícula realizada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la matrícula' });
  }
};

const Baja = async (req, res) => {
  try {
    const submision = await Submision.findOne({ _id: { $eq: req.params.id }, status: 'matricula' });
    if (!submision) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encontró la planilla';
      throw error;
    }

    const circulo = submision.child.circulo;
    if (!circulo) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encuentra círculo matriculado en la planilla';
      throw error;
    }

    const yearOfLife = submision.child.year_of_life;
    if (!yearOfLife) { 
      // para la baja a los que salen en el ultimo año
      await submision.updateOne({
        $set: {
          status: 'baja',
          'child.circulo': {
            _id: '',
            name: '',
          },
        },
      });
    } 
    else 
    {  // para la baja en cualquier momento
      const sex = submision.child.sex;
      if (sex === 'femenino') {
        await Circulo.updateOne(
          { _id: circulo._id },
          { $inc: { [`matricula${yearOfLife}`]: -1, [`girls${yearOfLife}`]: -1 } }
        );
      } else {
        await Circulo.updateOne({ _id: circulo._id }, { $inc: { [`matricula${yearOfLife}`]: -1 } });
      }

      await submision.updateOne({ $set: { status: 'baja', 'child.circulo': {
        _id: '',
        name: '',
      }} });
    }

    res.status(200).json({ message: 'Baja realizada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la baja' });
  }
};

module.exports = { AceptarPropuestas, RechazarPropuesta, Baja, MatriculaManual };
