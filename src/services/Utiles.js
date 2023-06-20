const Tools = require('../schemas/tools.schema');
const Circulo = require('../schemas/circulo.schema');
const Submision = require('../schemas/submision.schema');
const PastCirculos = require('../schemas/pastCirculos.schema');
const Consejo = require('../schemas/consejosPopulares');

// Funcion para guardar fecha
const AddOmDate = async (req, res) => {
  try {
    const date = new Date(req.body.date);
    const filter = { uniqueValue: 'tools' }; // filtro para econtrar el documento
    await Tools.updateOne(filter, { $set: { omDate: date } });
    res.status(200).json({ message: 'La fecha se ha actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la fecha.' });
  }
};

// Funcion para resetear fecha
const ResetOmDate = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    await Tools.updateOne(filter, { $set: { omDate: '' } });
    res.status(200).json({ message: 'La fecha ha sido reseteada correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear la fecha.' });
  }
};

// Funcion para resetear numero consecutivo a 0
const ResetConsecutive = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    await Tools.updateOne(filter, { $set: { consecutive: 0 } });
    res.status(200).json({ message: 'El consecutivo ha sido reseteado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear el consecutivo.' });
  }
};

const setContadorGP = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    await Tools.updateOne(filter, { $inc: { contadorGP: 1 } });
    res.status(200).json({ message: 'El contador de generacion de propuestas ha aumetado 1.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al setear el contadorGP.' });
  }
};

const setContadorCC = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    await Tools.updateOne(filter, { $inc: { contadorCC: 1 } });
    res.status(200).json({ message: 'El contador de nuevo curso de propuestas ha aumetado 1.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al setear el contadorCC.' });
  }
};

const setContadorAcept = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    await Tools.updateOne(filter, { $inc: { contadorAcept: 1 } });
    res.status(200).json({ message: 'El contador de propuestas aceptadas ha aumetado 1.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al setear el contadorAcept.' });
  }
};

// Funcion para resetear el contador de generar propuestas a 0
const ResetContadores = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    await Tools.updateOne(filter, { $set: { contadorGP: 0, contadorCC: 0 , contadorAcept : 0} });
    res.status(200).json({ message: 'El contador de generacion de propuestas ha sido reseteado.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear el contadorGP.' });
  }
};

// resetear arreglos que se usan para generar las propuestas
const ResetPropuestasArrays = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    await Tools.updateOne(filter, { $set: { circulosParaGP: [], proyeccionParaGP: [] } });
    res.status(200).json({ message: 'Arreglos de tools reseteados' });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear arreglos.' });
  }
};

// Funcion para establecer el curso actual
const AddCurso = async (req, res) => {
  try {
    const cursoYear = req.body.curso;
    const filter = { uniqueValue: 'tools' }; // filtro para econtrar el documento
    await Tools.updateOne(filter, { $set: { curso: cursoYear } });
    res.status(200).json({ message: 'El curso se ha actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el curso' });
  }
};

// Funcion para proyectar matriculas
const ProyectarMatriculas = async (req, res) => {
  const filter = { uniqueValue: 'tools' };
  const tools = await Tools.findOne(filter);

  const circulos = await Circulo.find();
  if (!circulos) {
    const error = new Error();
    error.status = 404;
    error.message = 'No hay círculos para proyectar';
    throw error;
  }
  const circulosProyectados = [];

  for (const circulo of circulos) {
    const cap6 = circulo.normed_capacity6;

    if (cap6 !== 0) {
      circulo.matricula6 = circulo.matricula5;
      circulo.attendance6 = circulo.attendance5;
      circulo.girls6 = circulo.girls5;
    }
    circulo.matricula5 = circulo.matricula4;
    circulo.matricula4 = circulo.matricula3;
    circulo.matricula3 = circulo.matricula2;
    circulo.matricula2 = 0;

    circulo.calculated_capacity2 = circulo.normed_capacity2;

    circulo.attendance5 = circulo.attendance4;
    circulo.attendance4 = circulo.attendance3;
    circulo.attendance3 = circulo.attendance2;
    circulo.attendance2 = 0;

    circulo.girls5 = circulo.girls4;
    circulo.girls4 = circulo.girls3;
    circulo.girls3 = circulo.girls2;
    circulo.girls2 = 0;

    circulo.curso = tools.curso + 1;

    const calculateCapacity = async () => {
      circulo.attendance2 >=1 && circulo.attendance2 <= 80
        ? (circulo.calculated_capacity2 = Math.floor(circulo.normed_capacity2 * 1.2))
        : (circulo.calculated_capacity2 = circulo.normed_capacity2);
    
      circulo.attendance3 >=1 && circulo.attendance3 <= 80
        ? (circulo.calculated_capacity3 = Math.floor(circulo.normed_capacity3 * 1.2))
        : (circulo.calculated_capacity3 = circulo.normed_capacity3);
    
      circulo.attendance4 >=1 && circulo.attendance4 <= 80
        ? (circulo.calculated_capacity4 = Math.floor(circulo.normed_capacity4 * 1.2))
        : (circulo.calculated_capacity4 = circulo.normed_capacity4);
    
      circulo.attendance5 >=1 && circulo.attendance5 <= 80
        ? (circulo.calculated_capacity5 = Math.floor(circulo.normed_capacity5 * 1.2))
        : (circulo.calculated_capacity5 = circulo.normed_capacity5);
    
      circulo.attendance6 >=1 && circulo.attendance6 <= 80
        ? (circulo.calculated_capacity6 = Math.floor(circulo.normed_capacity6 * 1.2))
        : (circulo.calculated_capacity6 = circulo.normed_capacity6);
    };

    calculateCapacity();
    circulosProyectados.push(circulo);
    await Tools.updateOne({ uniqueValue: 'tools' }, { $set: { proyeccionParaGP: circulosProyectados } });
  }
  res.status(200).json({ message: 'proyección realizada con éxito' });
};

// Funcion para crear copia de los circulos reales para las vueltas extra de generar propuestas
const CirculosCopia = async (req, res) => {
  const circulos = await Circulo.find();
  const circulosCopia = [];

  for (const circulo of circulos) {
    circulosCopia.push(circulo);
    await Tools.updateOne({ uniqueValue: 'tools' }, { $set: { circulosParaGP: circulosCopia } });
  }
  res.status(200).json({ message: 'copia realizada con éxito' });
};

const NewCurso = async (req, res) => {
  const filter = { uniqueValue: 'tools' };
  const tools = await Tools.findOne(filter);
  const circulos = await Circulo.find();
  const oldCirculos = [];

  for (const circulo of circulos) {
    oldCirculos.push(circulo);
  }
  const pastCirculos = new PastCirculos();
  pastCirculos.year = tools.curso;
  pastCirculos.circulos = oldCirculos;
  await pastCirculos.save();

  await CambioDeCurso(req, res);
  res.status(200).json({ message: 'curso pasado guardado con exito' });
};

// Funcion para cambio de curso
const CambioDeCurso = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    const tools = await Tools.findOne(filter);

    const circulos = await Circulo.find();
    if (!circulos) {
      const error = new Error();
      error.status = 404;
      error.message = 'No hay círculos para mostrar';
      throw error;
    }
    const submisions = await Submision.find({ status: { $eq: 'matricula' } });
    if (!submisions) {
      const error = new Error();
      error.status = 404;
      error.message = 'No hay planinllas matriculadas';
      throw error;
    }

    for (const circulo of circulos) {
      const cap6 = circulo.normed_capacity6;

      if (cap6 !== 0) {
        circulo.matricula6 = circulo.matricula5;
        circulo.attendance6 = circulo.attendance5;
        circulo.girls6 = circulo.girls5;
      }
      circulo.matricula5 = circulo.matricula4;
      circulo.matricula4 = circulo.matricula3;
      circulo.matricula3 = circulo.matricula2;
      circulo.matricula2 = 0;

      circulo.calculated_capacity2 = circulo.normed_capacity2;

      circulo.attendance5 = circulo.attendance4;
      circulo.attendance4 = circulo.attendance3;
      circulo.attendance3 = circulo.attendance2;
      circulo.attendance2 = 0;

      circulo.girls5 = circulo.girls4;
      circulo.girls4 = circulo.girls3;
      circulo.girls3 = circulo.girls2;
      circulo.girls2 = 0;

      circulo.curso = tools.curso + 1;

      await circulo.calculateCapacity();
      await circulo.save();
    }

    await Tools.updateOne({ _id: tools._id }, { $inc: { curso: 1 } });

    // ACTUALIZAR TODAS LAS PLANILLAS YEAR OF LIFE INCREMENTAR 1
    // SI CHILD.CIRCULO CAPACITY6 = 0
    for (const submision of submisions) {
      if (!submision.child.circulo._id) {
        const error = new Error();
        error.status = 404;
        error.message = `La planilla ${submision.entryNumber} no contiene un cículo válido `;
        throw error;
      }

      const circuloMatriculado = await Circulo.find({ _id : { $eq: submision.child.circulo._id } });
      if (!circuloMatriculado) {
        const error = new Error();
        error.status = 404;
        error.message = `No se encuentra círculo matriculado en la planilla ${submision.entryNumber}`;
        throw error;
      }

      const yearOfLife = submision.child.year_of_life;
      const cap6 = circuloMatriculado.normed_capacity6;

      if ((cap6 === 0 && yearOfLife === 5) || yearOfLife === 6) {
        await Submision.updateOne({ _id: submision._id }, { $set: { 'child.year_of_life': 0 } });
      } else {
        await Submision.updateOne({ _id: submision._id }, { $inc: { 'child.year_of_life': 1 } });
      }
      // pone en null el año a los salientes del circulo para baja manual
    }

    res.status(200).json({ message: 'Cambio de curso realizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener herramientas
const GetTools = async (req, res) => {
  try {
    const filter = { uniqueValue: 'tools' };
    const tools = await Tools.findOne(filter);
    if (!tools) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encontró tools ';
      throw error;
    }
    return res.status(200).send(tools);
  } catch (error) {
    res.status(500).json({ message: 'Error al encontrar tools.' });
  }
};

const DeactivateCirculo = async (req, res) => {
  try {
    const circulo = await Circulo.findOne({ _id: { $eq: req.params.id } });
    if (!circulo) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encontró el círculo';
      throw error;
    }

    if (circulo.isCiActive === true) {
      await Circulo.updateOne({ _id: circulo._id }, { $set: { isCiActive: false } });
    } else {
      await Circulo.updateOne({ _id: circulo._id }, { $set: { isCiActive: true } });
    }

    res.status(200).json({ message: 'Estado del círculo actualizado con exito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el estado del circulo' });
  }
};

const AddConsejo = async (req, res) => {

  const consejoExist = await Consejo.findOne({
    name: { $regex: new RegExp(`^${req.body.name}$`, 'i') }
  });
  if (consejoExist) {
    const error = new Error();
    error.status = 409;
    error.message = 'Error, ya existe ese consejo';
    throw error;
  }   

  const consejo = new Consejo(req.body);
  const consejoNuevo = await consejo.save();
  if (!consejoNuevo) {
    const error = new Error();
    error.message = 'Error al guardar consejo';
    throw error;
  }
  res.status(201).send(consejo).json({ Consejo: 'Consejo creado' });
};

  const GetConsejos = async (req, res) => {
    const consejos = await Consejo.find({});
    if (!consejos) {
      const error = new Error();
      error.status = 404;
      error.message = 'No hay consejos para mostrar';
      throw error;
    }
    return res.status(200).json(consejos);
  };

const DeleteConsejo = async (req, res) => {
  const consejo = await Consejo.findById(req.params.id);
  if (!consejo) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el consejo popular';
    throw error;
  }
  await Consejo.findByIdAndDelete(req.params.id);
  return res.sendStatus(204);
};

module.exports = {
  AddOmDate,
  ResetOmDate,
  GetConsejos,
  AddConsejo,
  DeleteConsejo,
  ResetConsecutive,
  setContadorGP,
  setContadorCC,
  setContadorAcept,
  ResetContadores,
  ResetPropuestasArrays,
  AddCurso,
  ProyectarMatriculas,
  CirculosCopia,
  NewCurso,
  CambioDeCurso,
  GetTools,
  DeactivateCirculo,
};
