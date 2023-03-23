/* const Circulo = require("../schemas/circulo.schema"); */
const haversine = require("haversine");
const { ProyectarMatriculas } = require("./Utiles");
const Circulos = require('../schemas/circulo.schema');
const Tools = require ("../schemas/tools.schema");

const circulosProyectados =  ProyectarMatriculas(); // Obtener arreglo de proyeccion
const circulosReal =  Circulos.find({}); // Obtener arreglo de datos reales

exports.EvaluateAndAsign = async (submision, circulosArray) => { // paso el arreglo de circulos correspondiente dependiendo de la gen de prop
  const tools = await Tools.findOne({ uniqueValue: "tools" });
  if (tools.contadorGP === 0) {   
    circulosArray =  circulosProyectados
  } else if (tools.contadorGP >= 1 ) { circulosArray =  circulosReal }

  try {
    const childPos = { latitude: submision.child.latlng[0], longitude: submision.child.latlng[1] };
    const yearOfLife = submision.child.year_of_life;
    const sex = submision.child.sex;
    const ciPedido = submision.ciPedido;
    const otherChildrenCenter = submision.parents[0].otherChildrenCenter;
    let requestedCirculo;
    const distancias = [];

    // FIRST evaluar si hay un circulo solicitado (el ciPedido o el otherChildrenCenter existen)
    for (const circulo of circulosArray) {  
    if (circulo.name === ciPedido || circulo.name === otherChildrenCenter) {
    requestedCirculo = circulo}}

    // si hay un circulo solicitado y tiene capacidad, asignarlo
    if (requestedCirculo && requestedCirculo[`calculated_capacity${yearOfLife}`] - requestedCirculo[`matricula${yearOfLife}`] > 0) {
      submision.child.circulo = { id: requestedCirculo._id, name: requestedCirculo.name };
      submision.status = 'propuesta';
      await submision.save();

      requestedCirculo[`matricula${yearOfLife}`] += 1;
      if (sex === 'femenino'){
        requestedCirculo[`girls${yearOfLife}`] +=1;
      } await requestedCirculo.save();
      }
      // si no existe circulo solicitado o no hay capacidad calcular distancias para encontrar el mas cercano
    else {
      for (const circulo of circulosArray) {   
      const circuloPos = {latitude: circulo.latlng[0], longitude: circulo.latlng[1]}
      const distancia = haversine(childPos, circuloPos);
      distancias.push({circulo: circulo._id, distancia});
      }
      distancias.sort((a, b) => a.distancia - b.distancia);  // ordenar distancias 

      let flag = false; // bandera para indicar que ya se creo la propuesta
      let closestCirculo = distancias.shift();

      while (!flag && distancias.length > 0) { // Revisar si el circulo mas cercano tiene capacidad y asignarlo
        if (closestCirculo[`calculated_capacity${yearOfLife}`] - closestCirculo[`matricula${yearOfLife}`] > 0) {
          submision.child.circulo = { id: closestCirculo._id, name: closestCirculo.name };
          submision.status = 'propuesta';
          await submision.save();    
          
          closestCirculo[`matricula${yearOfLife}`] += 1;
          if (sex === 'femenino'){
            closestCirculo[`girls${yearOfLife}`] +=1;
          } await closestCirculo.save();
          
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

