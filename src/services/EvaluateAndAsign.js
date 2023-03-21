/* const Circulo = require("../schemas/circulo.schema"); */
const haversine = require("haversine");
const { ProyectarMatriculas } = require("./Utiles");

exports.EvaluateAndAsign = async (submision) => {
  try {
    const childPos = { latitude: submision.child.latlng[0], longitude: submision.child.latlng[1] };
    const yearOfLife = submision.child.year_of_life;
    const ciPedido = submision.ciPedido;
    const otherChildrenCenter = submision.parents[0].otherChildrenCenter;
    let requestedCirculo;
    const distancias = [];

    const circulosProyectados = await ProyectarMatriculas(); // Obtener arreglo de proyeccion
    /*   const circulos = await Circulo.find({}); // Obtener arreglo de datos reales */

    // FIRST evaluar si hay un circulo solicitado (el ciPedido o el otherChildrenCenter existen)
    for (const circuloProyectado of circulosProyectados) {  
    if (circuloProyectado.name === ciPedido || circuloProyectado.name === otherChildrenCenter) {
    requestedCirculo = circuloProyectado}}

    // si hay un circulo solicitado y tiene capacidad, asignarlo
    if (requestedCirculo && requestedCirculo[`calculated_capacity${yearOfLife}`] - requestedCirculo[`matricula${yearOfLife}`] > 0) {
      submision.child.circulo = { id: requestedCirculo._id, name: requestedCirculo.name };
      submision.status = 'propuesta';
      await submision.save();
      }
      // si no existe circulo solicitado o no hay capacidad calcular distancias para encontrar el mas cercano
    else {
      for (const circuloProyectado of circulosProyectados) {  
      const circuloPos = {latitude: circuloProyectado.latlng[0], longitude: circuloProyectado.latlng[1]}
      const distancia = haversine(childPos, circuloPos);
      distancias.push({circulo: circuloProyectado._id, distancia});
      }
      distancias.sort((a, b) => a.distancia - b.distancia);  // ordenar distancias 

      let flag = false; // bandera para indicar que ya se creo la propuesta
      let closestCirculo = distancias.shift();

      while (!flag && distancias.length > 0) { // Revisar si el circulo mas cercano tiene capacidad y asignarlo
        if (closestCirculo[`calculated_capacity${yearOfLife}`] - closestCirculo[`matricula${yearOfLife}`] > 0) {
          submision.child.circulo = { id: closestCirculo._id, name: closestCirculo.name };
          submision.status = 'propuesta';
          await submision.save();     
          flag = true;   
        } 
        else {
            closestCirculo = distancias.shift(); 
            }
        if (!flag) {
            throw new Error("No hay círculos con capacidad disponible") 
        }}      
    }} catch (error) {
        throw new Error(`Error al generar propuesta: ${error.message}`);
      }};

