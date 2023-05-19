const Submision = require('../schemas/submision.schema');
const Circulo = require('../schemas/circulo.schema');

const AceptarPropuestas = async (req, res) => {
  const aprobadas = req.body; // obetener el arreglo de las sumisions aprobadas que se envia desde el frontend
  if (!Array.isArray(aprobadas) || aprobadas.length === 0) {
    return res.status(400).json({ message: 'el arreglo aprobadas no es correcto o esta vacio' });
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
        error.message = 'No se encontró el circulo propuesto en la planilla';
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

    res.status(200).json({ message: 'Propuestas aceptadas matriculadas con exito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar las propuestas' });
  }
};

const RechazarPropuesta = async (req, res) => {
  const rechazadas = req.body; // obtener el arreglo de las sumisions rechazadas que se envia desde el frontend
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

    await Submision.updateMany(
      { _id: { $in: submisionsRechazadas } },
      { $set: { status: 'pendiente', 'child.circulo': {} } }
    );

    res.status(200).json({ message: 'Propuestas rechazadas reestablecidas a pendiente' });
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
    }).populate('child.circulo');
    if (!submision) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encontró la planilla o los datos no son correctos';
      throw error;
    }

    const circulo = submision.child.circulo;
    if (!circulo) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encuentra el circulo ';
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

    await submision.updateOne({ $set: { status: 'matricula', 'child.matriculaDate': now } });

    res.status(200).json({ message: 'Matricula manual realizada con exito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la matricula manual' });
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
      error.message = 'No se encuentra circulo matriculado en la planilla';
      throw error;
    }

    const yearOfLife = submision.child.year_of_life;
    if (!yearOfLife) {
      await submision.updateOne({ $set: { status: 'baja', 'child.circulo': {} } });
    } else {
      const sex = submision.child.sex;
      if (sex === 'femenino') {
        await Circulo.updateOne(
          { _id: circulo._id },
          { $inc: { [`matricula${yearOfLife}`]: -1, [`girls${yearOfLife}`]: -1 } }
        );
      } else {
        await Circulo.updateOne({ _id: circulo._id }, { $inc: { [`matricula${yearOfLife}`]: -1 } });
      }

      await submision.updateOne({ $set: { status: 'baja', 'child.circulo': {} } });
    }

    res.status(200).json({ message: 'Baja realizada con exito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la baja' });
  }
};

module.exports = { AceptarPropuestas, RechazarPropuesta, Baja, MatriculaManual };
