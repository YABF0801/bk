const haversine = require("haversine");

exports.EvaluateAndAsign = async (submision, circulosArray) => { 
try {
    const childPos = {latitude: submision.child.latlng[0],longitude: submision.child.latlng[1]};
    const yearOfLife = submision.child.year_of_life;
    const sex = submision.child.sex; 
    const ciPedido = submision.ciPedido;
    let requestedCirculo;
    const otherChildrenCenter = submision.parents[0].otherChildrenCenter; 
    const distancias = [];

    // evaluar si hay un circulo solicitado (el ciPedido o el otherChildrenCenter existen)
    if (ciPedido) {
      for (const circulo of circulosArray) {  
        if (circulo.name === ciPedido || circulo.name === otherChildrenCenter ) {
          requestedCirculo = circulo}         
      }
    };    

        // si hay un circulo solicitado y tiene capacidad, asignarlo
        if (requestedCirculo && requestedCirculo[`normed_capacity${yearOfLife}`] - requestedCirculo[`matricula${yearOfLife}`] >= 1) {
          const circuloData = { _id: requestedCirculo._id, name: requestedCirculo.name };

          await submision.updateOne({$set: { status: 'propuesta', 'child.circulo': circuloData }});
   
          if (sex === 'femenino') {
            await requestedCirculo.updateOne({ $inc: { [`matricula${yearOfLife}`]: 1, [`girls${yearOfLife}`]: 1 }});
          } else {
            await requestedCirculo.updateOne({ $inc: { [`matricula${yearOfLife}`]: 1 }});
          }   
    } 
    // si no existe circulo solicitado o no hay capacidad calcular distancias para encontrar el mas cercano
    else {
    
      for (const circulo of circulosArray) {  
      const circuloPos = {latitude: circulo.latlng[0],longitude: circulo.latlng[1]};
      const distancia = haversine(childPos, circuloPos);
      distancias.push({circulo, distancia});
      }
      distancias.sort((a, b) => a.distancia - b.distancia);  // ordenar distancias 
     
     for (const circulo of distancias) { // Revisar si el circulo mas cercano tiene capacidad y asignarlo 
        const closestCirculo = circulo.circulo;

        const circuloData = { _id: closestCirculo._id, name: closestCirculo.name };
        const normedCapacity = closestCirculo[`normed_capacity${yearOfLife}`];
        const matricula = closestCirculo[`matricula${yearOfLife}`];

        if (normedCapacity-matricula >= 1) {
        
        await submision.updateOne({$set: { status: 'propuesta', 'child.circulo': circuloData }});
 
        if (sex === 'femenino') {
          await closestCirculo.updateOne({ $inc: { [`matricula${yearOfLife}`]: 1, [`girls${yearOfLife}`]: 1 }});
        } else {
          await closestCirculo.updateOne({ $inc: { [`matricula${yearOfLife}`]: 1 }});
        } 

        break; // Detener la ejecución del ciclo
      } else {
        console.log('No hay plazas disponibles en ningún círculo');
              }  
            }
        }} catch (error) {
        throw new Error(`Error al generar propuestas: ${error.message}`);  
 }};

