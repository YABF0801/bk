const { Router } = require('express');

const StatisticsServices = require('../services/Statistics');
const isAuthorized = require('../middlewares/isAuthorized');

const statisticsRouter = Router();

// DATOS DE CICULOS POR AÑO
statisticsRouter.get('/matricula', isAuthorized, StatisticsServices.getTotalMatricula);   // MATRICULAS REALES POR AÑO
statisticsRouter.get('/capacidad-c', isAuthorized, StatisticsServices.getTotalCalculatedCapacity);   // CAPACIDADES CALCULADAS POR AÑO
statisticsRouter.get('/capacidad-n', isAuthorized, StatisticsServices.getTotalNormedCapacity); // CAPACIDADES NORMADAS POR AÑO 
statisticsRouter.get('/asistencia', isAuthorized, StatisticsServices.getAverageAttendance);   //  PROMEDIOS DE ASISTENCIA POR AÑO 
statisticsRouter.get('/girls', isAuthorized, StatisticsServices.getTotalGirls); // NIÑAS POR AÑO
statisticsRouter.get('/boys', isAuthorized, StatisticsServices.getTotalBoys); //  NIÑOS  POR AÑO
statisticsRouter.get('/boys-girls', /* isAuthorized, */ StatisticsServices.getTotalGirlsAndBoys); // TOTALES NIÑOS Y NIÑAS

// DATOS GENERALES DE CIRCULOS
statisticsRouter.get('/cap-mat', isAuthorized, StatisticsServices.CapacityAndMatricula); // TOTALES GENERALES CAPACIDAD NORM Y MATRICULA

// DATOS DE SUBMISIONS
statisticsRouter.get('/childs-age', isAuthorized, StatisticsServices.getTotalChildPerAge); // niños por edades
statisticsRouter.get('/m-cpopular', isAuthorized, StatisticsServices.getMatriculaPorCp); // matricula cpor consejo popular
statisticsRouter.get('/social', isAuthorized, StatisticsServices.getSocialCase); // cantidad de cassos sociales
statisticsRouter.get('/status-count', isAuthorized, StatisticsServices.getStatusCount); // cantidad de planillas por status
statisticsRouter.get('/ocupation-count', isAuthorized, StatisticsServices.getOcupationCount); // cantidad de padres por ocupacion 
statisticsRouter.get('/other-children', isAuthorized, StatisticsServices.getOtherChildrenInCi); // cantidad de fammilias que tienen mas de un niño en el circulo 
statisticsRouter.get('/user-count', isAuthorized, StatisticsServices.getSubmisionsByUser); // cantidad de submisions creaadas por usuario
statisticsRouter.get('/date-count', isAuthorized, StatisticsServices.getSubmisionCountByDate); // cantidad de solicitues registradas por año y por mes...
statisticsRouter.get('/aprove-count', isAuthorized, StatisticsServices.getSubmisionAprovedByYear); // cantidad de matriculas aprobadas por año

module.exports = statisticsRouter;