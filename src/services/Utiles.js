const Tools = require('../schemas/tools.schema');
const Circulo = require('../schemas/circulo.schema');
const Submision = require("../schemas/submision.schema");

// Funcion para guardar fecha
const AddOmDate = async (req, res) => {
    try {
        const date = new Date(req.body.date);
        const filter = { uniqueValue: "tools" }; // filtro para econtrar el documento
        await Tools.updateOne(filter, { $set: { omDate: date }});
        res.status(200).json({ message: 'La fecha se ha actualizado correctamente.' });
  } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la fecha.' });
  }
};

// Funcion para resetear fecha
const ResetOmDate = async (req, res) => {
    try {
        const filter = { uniqueValue: "tools" };
        await Tools.updateOne(filter, {$set: {omDate: ''}});
        res.status(200).json({ message: 'La fecha ha sido reseteada correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al resetear la fecha.' });
  }
};

// Funcion para resetear numero consecutivo a 0
const ResetConsecutive = async (req, res) => {
  try {
      const filter = { uniqueValue: "tools" };
      await Tools.updateOne(filter, {$set: {consecutive: 0}});
      res.status(200).json({ message: 'el consecutivo ha sido reseteado correctamente.' });
} catch (error) {
  res.status(500).json({ message: 'Error al resetear el consecutivo.' });
}
};
  
// Funcion para resetear numero consecutivo a 0
const ResetContadorGP = async (req, res) => {
  try {
      const filter = { uniqueValue: "tools" };
      await Tools.updateOne(filter, {$set: {contadorGP: 0}});
      res.status(200).json({ message: 'el contador de generacion de propuestas ha sido reseteado.' });
} catch (error) {
  res.status(500).json({ message: 'Error al resetear el contadorGP.' });
}
};

// Funcion para proyectar matriculas
// para las rutas:
// const {ProyectarMatriculas} = require('../services/Utiles');
// circuloRouter.get('/proyeccion',  isAuthorized, ProyectarMatriculas); 

const ProyectarMatriculas = async (req, res) => {
    const circulos = await Circulo.find(); 
    const circulosProyectados = [];

    for (const circulo of circulos) {
    const circuloProyectado = { ...circulo }; // nuevo objeto circulo
    const cap6 = circuloProyectado.normed_capacity6;

    if (cap6 !== 0){
    circulo.matricula6 = circulo.matricula5; 
    circulo.matricula5 = circulo.matricula4;
    circulo.matricula4 = circulo.matricula3;
    circulo.matricula3 = circulo.matricula2;
    circulo.matricula2 = 0; 
      
    circulo.calculated_capacity2 = circulo.normed_capacity2; // Cc se iguala a la Cn por reinicio

    circulo.attendance6 =  circulo.attendance5;
    circulo.attendance5 =  circulo.attendance4;
    circulo.attendance4 =  circulo.attendance3;
    circulo.attendance3 =  circulo.attendance2;
    circulo.attendance2 =  0;

    circulo.girls6 = circulo.girls5;
    circulo.girls5 = circulo.girls4;
    circulo.girls4 = circulo.girls3;
    circulo.girls3 = circulo.girls2;
    circulo.girls2 = 0; 
    } else {
    circulo.matricula5 = circulo.matricula4;
    circulo.matricula4 = circulo.matricula3;
    circulo.matricula3 = circulo.matricula2;
    circulo.matricula2 = 0; 

    circulo.calculated_capacity2 = circulo.normed_capacity2;

    circulo.attendance5 =  circulo.attendance4;
    circulo.attendance4 =  circulo.attendance3;
    circulo.attendance3 =  circulo.attendance2;
    circulo.attendance2 =  0;

    circulo.girls5 = circulo.girls4;
    circulo.girls4 = circulo.girls3;
    circulo.girls3 = circulo.girls2;
    circulo.girls2 = 0; 
    }

    /* await circuloProyectado.calculateCapacity(); */
    circulosProyectados.push(circuloProyectado); 
  }
  return circulosProyectados;
};

// Funcion para cambio de curso 
// para las rutas:
// const {CambioDeCurso} = require('../services/Utiles');
// circuloRouter.get('/nuevo-curso',  isAuthorized, CambioDeCurso); 

const CambioDeCurso = async (req, res) => {
    try {
    const circulos = await Circulo.find(); 
     const submisions = await Submision.find( {status: { $eq: 'matricula' }});

    for (const circulo of circulos) {
    const cap6 = circulo.normed_capacity6;
    if (cap6 !== 0){
    circulo.matricula6 = circulo.matricula5; 
    circulo.matricula5 = circulo.matricula4;
    circulo.matricula4 = circulo.matricula3;
    circulo.matricula3 = circulo.matricula2;
    circulo.matricula2 = 0; 
      
    circulo.calculated_capacity2 = circulo.normed_capacity2; // Cc se iguala a la Cn por reinicio

    circulo.attendance6 =  circulo.attendance5;
    circulo.attendance5 =  circulo.attendance4;
    circulo.attendance4 =  circulo.attendance3;
    circulo.attendance3 =  circulo.attendance2;
    circulo.attendance2 =  0;

    circulo.girls6 = circulo.girls5;
    circulo.girls5 = circulo.girls4;
    circulo.girls4 = circulo.girls3;
    circulo.girls3 = circulo.girls2;
    circulo.girls2 = 0; 

   // ACTUALIZAR TODAS LAS PLANILLAS YEAR OF LIFE INCREMENTAR 1
   // SI CHILD.CIRCULO CAPACITY6 !== 0 
    const yearOfLife = [2,3,4,5];
    await Submision.updateMany({ _id: { $in: submisions }, 'child.year_of_life': { $in: yearOfLife}}, { $inc: { 'child.year_of_life': 1 }});
    // no hace nada con las que estaban en 6to para que le den baja a mano

    } else {
    circulo.matricula5 = circulo.matricula4;
    circulo.matricula4 = circulo.matricula3;
    circulo.matricula3 = circulo.matricula2;
    circulo.matricula2 = 0; 

    circulo.calculated_capacity2 = circulo.normed_capacity2;

    circulo.attendance5 =  circulo.attendance4;
    circulo.attendance4 =  circulo.attendance3;
    circulo.attendance3 =  circulo.attendance2;
    circulo.attendance2 =  0;

    circulo.girls5 = circulo.girls4;
    circulo.girls4 = circulo.girls3;
    circulo.girls3 = circulo.girls2;
    circulo.girls2 = 0; 

    // ACTUALIZAR TODAS LAS PLANILLAS YEAR OF LIFE INCREMENTAR 1
    // SI CHILD.CIRCULO CAPACITY6 = 0 
    const yearOfLife = [2,3,4];
    await Submision.updateMany({ _id: { $in: submisions }, 'child.year_of_life': { $in: yearOfLife}}, { $inc: { 'child.year_of_life': 1 }});
    // no hace nada con las que estaban en 5to y 6to para que le den baja a mano

    }
    await circulo.calculateCapacity();
    await circulo.save(); }
    res.status(200).json({ message: 'Cambio de curso realizado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el cambio de curso' });
}};
 

// Obtener entryNumber del último documento creado en la colección submisions
const FindLastSubmision = async (req, res) => {
    const lastSubmision = await Submision.findOne({}, {sort: {createdAt: -1}});
     if (!lastSubmision) {
    const error = new Error();
      error.status = 404;
      error.message = 'No se encontraron planillas';
      throw error;
      }
    return lastSubmision;
};


  module.exports = { AddOmDate, ResetOmDate, ResetConsecutive, ResetContadorGP, ProyectarMatriculas,CambioDeCurso, FindLastSubmision };