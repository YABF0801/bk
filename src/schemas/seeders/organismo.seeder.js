const Organismo = require('../organismo.schema');

const organismos = [
{
  name: "MINSAP",
  description: "Ministerio de Salud Publica",
  priorizado: true,
  weight: 2
},
{
  name: "MINED",
  description: "Ministerio de Educacion",
  priorizado: true,
  weight: 2
},
{
  name: "MINAG",
  description: "Ministerio de la Agricultura",
  priorizado: false,
  weight: 0
}
];

const seed = async () => {
try {
  const countBefore = await Organismo.countDocuments();
  await Organismo.deleteMany();
  await Organismo.create(organismos);
  const countAfter = await Organismo.countDocuments();

  if (countAfter - countBefore === organismos.length){
    console.log('Organismos seeded con exito');
  }else{
    console.error('Ocurrio un problea con el seeding de Organismos');
  }
}catch(err){
  console.error(err);
}
};

seed ();