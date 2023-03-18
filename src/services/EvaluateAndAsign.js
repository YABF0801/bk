const Circulo = require("../schemas/circulo.schema");
const haversine = require("haversine");

exports.EvaluateAndAsign = async (submision) => {
  try {
const circulos = await Circulo.find({}).exec();

const childPos = { latitude: submision.child.lat, longitude: submision.child.lon }
const yearOfLife = submision.child.year_of_life;
const sex = submision.child.sex;
const ciPedido = submision.ciPedido;
const otherChildrenCenter = submision.parents[0].otherChildrenCenter;
const distancias = [];
 
// FIRST evaluar si el ciPedido o el otherChildrenCenter existen
let requestedCirculo;
for (let i = 0; i < circulos.length; i++) {
if (circulos[i].name === ciPedido || circulos[i].name === otherChildrenCenter) {
  requestedCirculo = circulos[i];
break;}}

// si hay un circulo solicitado y tiene capacidad, asignarlo
                                    //  [`calculated_capacity${yearOfLife}`]
if (requestedCirculo && requestedCirculo[`normed_capacity${yearOfLife}`] - requestedCirculo[`matricula${yearOfLife}`] > 0) {
  submision.child.circulo = {
    id: requestedCirculo._id,
    name: requestedCirculo.name
  };
  submision.status = 'propuesta';
  await submision.save();

  requestedCirculo[`matricula${yearOfLife}`] += 1;
  await requestedCirculo.save();
}
// si no existe circulo solicitado calcular distancias para encontrar el mas cercano
else {

for (let i = 0; i < circulos.length; i++) {
const circuloPos = {latitude: circulos[i].lat,longitude: circulos[i].lon}
const distancia = haversine(childPos, circuloPos);
distancias.push({circulo: circulos[i]._id, distancia});
}

distancias.sort((a, b) => a.distancia - b.distancia);

let flag = false;
let closestCirculo = distancias.shift();

while (!flag && distancias.length > 0) {

// para los de la 2da vuelta checkear que no se le asigne el mismo circulo de antes
if (closestCirculo.name === submision.child.circulo.name){
  closestCirculo = distancias.shift(); 
  continue;
}

// Revisar si el circulo mas cercano tiene capacidad y asignarlo
              //  [`calculated_capacity${yearOfLife}`]
if (closestCirculo[`normed_capacity${yearOfLife}`] - closestCirculo[`matricula${yearOfLife}`] > 0) {
  flag = true;
  submision.child.circulo = {
    id: closestCirculo._id,
    name: closestCirculo.name  };
  submision.status = 'propuesta';
  await submision.save();

  // sumar 1 a la matricula del circulo y 1 al conteo de niñas
  closestCirculo[`matricula${yearOfLife}`] += 1;
  if (sex === 'femenino'){
    closestCirculo[`girls${yearOfLife}`] +=1;
  }
  await closestCirculo.save();
  } 
  else {
    closestCirculo = distancias.shift(); 
    }
  if (!flag) {
      throw new Error("No hay círculos con capacidad disponible");
  }
  }
}
} catch (error) {
  throw new Error(`Error al generar propuesta: ${error.message}`);
}
};

