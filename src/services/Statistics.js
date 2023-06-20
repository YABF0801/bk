const Submision = require('../schemas/submision.schema');
const Circulo = require("../schemas/circulo.schema");
const PastCirculos = require('../schemas/pastCirculos.schema'); // Importa el modelo de la colección

// funciones Aggregate para estadisticas

// OBTENER EL TOTAL DE CAPACIDADES NORMADAS POR AÑO
const getTotalNormedCapacity = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalNormedCapacity2: { $sum: "$normed_capacity2" },
          totalNormedCapacity3: { $sum: "$normed_capacity3" },
          totalNormedCapacity4: { $sum: "$normed_capacity4" },
          totalNormedCapacity5: { $sum: "$normed_capacity5" },
          totalNormedCapacity6: { $sum: "$normed_capacity6" }
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// OBTENER EL TOTAL DE MATRICULAS REALES POR AÑO
const getTotalMatricula = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalMatricula2: { $sum: "$matricula2" },
          totalMatricula3: { $sum: "$matricula3" },
          totalMatricula4: { $sum: "$matricula4" },
          totalMatricula5: { $sum: "$matricula5" },
          totalMatricula6: { $sum: "$matricula6" },
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// OBTENER EL TOTAL DE MATRICULAS
const getMatricula = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalMatricula: {
            $sum: {
              $sum: ["$matricula2", "$matricula3", "$matricula4", "$matricula5", "$matricula6"]
            }
          }
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// OBTENER EL TOTAL DE CAPACIDADES CALCULADAS POR AÑO
const getTotalCalculatedCapacity = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalCalculatedCapacity2: { $sum: "$calculated_capacity2" },
          totalCalculatedCapacity3: { $sum: "$calculated_capacity3" },
          totalCalculatedCapacity4: { $sum: "$calculated_capacity4" },
          totalCalculatedCapacity5: { $sum: "$calculated_capacity5" },
          totalCalculatedCapacity6: { $sum: "$calculated_capacity6" },
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// OBTENER PROMEDIO DEL PORCIENTO DE ASISTENCIA POR AÑO 
const getAverageAttendance = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalAttendance2: { $avg: "$attendance2" },
          totalAttendance3: { $avg: "$attendance3" },
          totalAttendance4: { $avg: "$attendance4" },
          totalAttendance5: { $avg: "$attendance5" },
          totalAttendance6: { $avg: "$attendance6" },
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};



// OBTENER EL TOTAL DE NI;AS POR AÑO
const getTotalGirls = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalGirls2: { $sum: "$girls2" },
          totalGirls3: { $sum: "$girls3" },
          totalGirls4: { $sum: "$girls4" },
          totalGirls5: { $sum: "$girls5" },
          totalGirls6: { $sum: "$girls6" },
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// OBTENER EL TOTAL DE NIN;OS  POR AÑO
const getTotalBoys = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalGirls2: { $sum: "$girls2" },
          totalGirls3: { $sum: "$girls3" },
          totalGirls4: { $sum: "$girls4" },
          totalGirls5: { $sum: "$girls5" },
          totalGirls6: { $sum: "$girls6" },
          totalMatricula2: { $sum: "$matricula2" },
          totalMatricula3: { $sum: "$matricula3" },
          totalMatricula4: { $sum: "$matricula4" },
          totalMatricula5: { $sum: "$matricula5" },
          totalMatricula6: { $sum: "$matricula6" },
        }
      }, {
        $project: {
          _id: 0,
          totalBoys2: { $subtract: ["$totalMatricula2", "$totalGirls2"] },
          totalBoys3: { $subtract: ["$totalMatricula3", "$totalGirls3"] },
          totalBoys4: { $subtract: ["$totalMatricula4", "$totalGirls4"] },
          totalBoys5: { $subtract: ["$totalMatricula5", "$totalGirls5"] },
          totalBoys6: { $subtract: ["$totalMatricula6", "$totalGirls6"] }
        }
      }
    ]);
    return res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
  }
};

// total de niñas y niños
const getTotalGirlsAndBoys = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          totalGirls: {
            $sum: {
              $add: [
                "$girls2",
                "$girls3",
                "$girls4",
                "$girls5",
                "$girls6"
              ]
            }
          },
          totalMatricula: {
            $sum: {
              $add: [
                "$matricula2",
                "$matricula3",
                "$matricula4",
                "$matricula5",
                "$matricula6"
              ]
            }
          },
        }
      },
      {
        $addFields: {
          totalBoys: {
            $subtract: [
              "$totalMatricula",
              "$totalGirls"
            ]
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalGirls: 1,
          totalBoys: 1
        }
      }
    ]);
    return res.status(200).json(result[0]);
  } catch (err) {
    console.error(err);
  }
};

// TOTALES GENERALES CIRCULO
const CapacityAndMatricula = async (req, res) => {
  try {
    const result = await Circulo.aggregate([
      {
        $group: {
          _id: null,
          NormedCapacity: { $sum: { $add: ["$normed_capacity2", "$normed_capacity3", "$normed_capacity4", "$normed_capacity5", "$normed_capacity6"] } },
          Matricula: { $sum: { $add: ["$matricula2", "$matricula3", "$matricula4", "$matricula5", "$matricula6"] } }
        }
      }
    ]);
    return res.status(200).json({ NormedCapacity: result[0].NormedCapacity, Matricula: result[0].Matricula });
  } catch (err) {
    console.error(err);
  }
};

// niños por edades
const getTotalChildPerAge = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $group: {
          _id: "$child.age", // agrupar por año de vida
          cant: { $sum: 1 } // contar documentos en cada año de vida
        }
      },
      {
        $sort: { _id: 1 } // ordenar ascendente
      },
      {
        $project: {
          _id: 1,
          cant: 1
        }
      }
    ]);

    const groupedByAge = result.reduce((acc, curr) => {
      if (curr._id < 1) { acc[`childs_age${0}`] = curr.cant; }
      else {
        acc[`childs_age${curr._id}`] = curr.cant;
      }
      return acc;
    }, {});

    return res.status(200).json(groupedByAge);
  } catch (err) {
    console.error(err);
  }
};

// matricula cpor consejo popular
const getMatriculaPorCp = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $match: { status: "matricula" }
      },
      {
        $group: {
          _id: "$child.cPopular", // agrupar por edad
          cant: { $sum: 1 } // contar documentos en cada edad
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// cantidad de cassos sociales
const getSocialCase = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $match: { socialCase: true }
      },
      {
        $group: {
          _id: "$socialCase", // agrupar por edad
          cant: { $sum: 1 } // contar documentos en cada edad
        }
      },
      {
        $project: {
          _id: 0,
          cant: 1
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// cantidad de submisions por status
const getStatusCount = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $group: {
          _id: "$status", // agrupar por status
          cant: { $sum: 1 } // contar documentos para cada status
        }
      }
    ]);
    const groupedByStatus = result.reduce((acc, curr) => {
      acc[`${curr._id}`] = curr.cant;
      return acc;
    }, {});
    return res.status(200).json(groupedByStatus);
  } catch (err) {
    console.error(err);
  }
};

// cantidad de parents por ocupacion
const getOcupationCount = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $unwind: "$child.parents" // desenrollar el arreglo de padres
      },
      {
        $group: {
          _id: "$child.parents.occupation", // agrupar por ocupacion de los padres
          cant: { $sum: 1 } // contar documentos para cada ocupacion 'trabajador', 'jubilado', 'asistenciado', 'estudiante'
        }
      },
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// cantidad de fammilias que tienen mas de un niño en el circulo
const getOtherChildrenInCi = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $unwind: "$child.parents"
      },
      {
        $match: { "child.parents.otherChildrenInCi": true }
      },
      {
        $group: {
          _id: "$child.parents.otherChildrenInCi",
          cant: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          cant: 1
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// cantidad de submisions por usuario
const getSubmisionsByUser = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $group: {
          _id: "$createdBy", // agrupar por usuario
          cant: { $sum: 1 } // contar documentos para cada usuario
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// cantidad de solicitues registradas por año y por mes...
const getSubmisionCountByDate = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, // extraer el año de la fecha
            month: { $month: "$createdAt" } // extraer el mes de la fecha
          },
          cant: { $sum: 1 } // contar documentos para cada año y mes
        }
      },
      {
        $project: {
          _id: 0,
          año: "$_id.year",
          mes: "$_id.month",
          cant: 1
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// cantidad de matriculas aprobadas por año
const getSubmisionAprovedByYear = async (req, res) => {
  try {
    const result = await Submision.aggregate([
      { $match: { status: "matricula" } },
      { $project: { _id: 0, matriculaDate: { $toDate: "$matriculaDate" } } }, // convertir string a fecha
      {
        $group: {
          _id: {
            year: { $year: "$matriculaDate" }, // extraer el año 
            month: { $month: "$matriculaDate" }
          },
          cant: { $sum: 1 } // contar documentos para cada año 
        }
      },
      {
        $project: {
          _id: 0,
          año: "$_id.year",
          mes: "$_id.month",
          cant: 1
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

// datos historicos de los circulos . totales
const getHistoricTotalsCirculos = async (req, res) => {
  try {
    const result = await PastCirculos.aggregate([
      {
        $unwind: '$circulos', // Desenrollar el arreglo 'circulos'
      },
      {
        $group: {
          _id: '$year',
          totalNormedCapacity: {
            $sum: {
              $sum: [
                '$circulos.normed_capacity2',
                '$circulos.normed_capacity3',
                '$circulos.normed_capacity4',
                '$circulos.normed_capacity5',
                '$circulos.normed_capacity6',
              ],
            },
          },
          totalMatricula: {
            $sum: {
              $sum: [
                '$circulos.matricula2',
                '$circulos.matricula3',
                '$circulos.matricula4',
                '$circulos.matricula5',
                '$circulos.matricula6',
              ],
            },
          },
          totalGirls: {
            $sum: {
              $sum: [
                '$circulos.girls2',
                '$circulos.girls3',
                '$circulos.girls4',
                '$circulos.girls5',
                '$circulos.girls6',
              ],
            },
          },
        },
      },
      {
        $addFields: {
          totalBoys: {
            $subtract: [
              "$totalMatricula",
              "$totalGirls"
            ]
          }
        }
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          year: '$_id',
          totalNormedCapacity: 1,
          totalMatricula: 1,
          totalGirls: 1,
          totalBoys: 1
        }
      }
    ]);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};


module.exports = {
  getTotalNormedCapacity,
  getTotalMatricula,
  getMatricula,
  getTotalCalculatedCapacity,
  getAverageAttendance,
  getTotalGirls,
  getTotalBoys,
  getTotalGirlsAndBoys,
  CapacityAndMatricula,
  getTotalChildPerAge,
  getMatriculaPorCp,
  getSocialCase,
  getStatusCount,
  getOcupationCount,
  getOtherChildrenInCi,
  getSubmisionsByUser,
  getSubmisionCountByDate,
  getSubmisionAprovedByYear,
  getHistoricTotalsCirculos,
};

