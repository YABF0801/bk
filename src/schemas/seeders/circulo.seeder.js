const Circulo = require('../circulo.schema');

const circulos = [
{
  number: 1,
  name: 'Meñique',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  matricula2: 5,
  matricula3: 4,
  matricula4: 5,
  matricula5: 3,
  matricula6: 0, 
  lat: 21.883845343039884,
  lon: -82.80881112308064,
  isCiActive: true
},
{
  number: 2,
  name: 'Nene Traviesa',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  atricula2: 5,
  matricula3: 5,
  matricula4: 3,
  matricula5: 4,
  matricula6: 1, 
  lat: 21.883147575927463,
  lon: -82.8111269423739,
  isCiActive: true
},
{
  number: 3,
  name: 'Ismaelillo',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  matricula2: 5,
  matricula3: 3,
  matricula4: 5,
  matricula5: 4,
  matricula6: 3, 
  lat: 21.890106678271582,
  lon: -82.81331257306189,
  isCiActive: true
},
/* otros circulos hasta el 23
{ 
  number: 4,
  name: 'La Edad de Oro',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  lat: 21.89561704365498,
  lon: -82.8080816567331,
  isCiActive: true  
},
{ 
  number: 5,
  name: 'Casita de Muñecas',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.687642116185906,
  lon: -82.64853310004587,
  isCiActive: true  
},
{ 
  number: 6,
  name: 'Florecita de Azahares',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.748100212024006,
  lon: -82.75106315401386,
  isCiActive: true  
},
{ 
  number: 7,
  name: 'Los Namibios',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.741343629366483,
  lon: -82.75627926935789,
  isCiActive: true  
},
  {
  number: 8,
  name: 'Toronjita Millonaria',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  lat: 21.74112528099911,
  lon: -82.76070093073388,
  isCiActive: true
  },
  {
  number: 9,
  name: 'R.R Llorca',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.887804714725895,
  lon: -82.80594322211128,
  isCiActive: true
  },
  {
  number: 10,
  name: 'Naranjo en Flor',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.79315787730789,
  lon: -82.95208644773054,
  isCiActive: true
  },
  {
  number: 12,
  name: 'Dimas Pozo',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.884210530819008,
  lon: -82.76755978029092,
  isCiActive: true
  },
  {
  number: 13,
  name: 'Patria',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.858092874308483,
  lon: -82.8032506037499,
  isCiActive: true
  },
  {
  number: 14,
  name: 'Nadiska Krupskaya',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  lat: 21.746199662343045,
  lon: -82.75079970004587,
  isCiActive: true
  },
  {
  number: 16,
  name: 'Los Mambisitos',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  lat: 21.888562972044227,
  lon: -82.79625582702984,
  isCiActive: true
  },
  {
  number: 17,
  name: 'Grandes Alamedas',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.895437855231382,
  lon: -82.81329587106586,
  isCiActive: true
  },
  {
  number: 19,
  name: 'Los Pineritos',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.681185479195996,
  lon: -82.90280452605246,
  isCiActive: true
  },
  {
  number: 20,
  name: 'Futuros Camilitos',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 0,
  lat: 21.88792436563197,
  lon: -82.79851387117547,
  isCiActive: true
  },
  {
  number: 21,
  name: 'Alegres Mineritos',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  lat: 21.813129651725777,
  lon: -82.95873031538987,
  isCiActive: true
  },
  {
  number: 22,
  name: 'Abel Santamaria',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  lat: 21.89074381564486,
  lon: -82.80854896987798,
  isCiActive: true
  },
  {
  number: 23,
  name: 'Flor de la Amistad',
  normed_capacity2: 5,
  normed_capacity3: 5,
  normed_capacity4: 5,
  normed_capacity5: 5,
  normed_capacity6: 5,
  lat: 21.7090418705491,
  lon: -82.82193736935788,
  isCiActive: true
  } */
];

const seed = async () => {
try {
  const countBefore = await Circulo.countDocuments();
  await Circulo.deleteMany();
  await Circulo.create(circulos);
  const countAfter = await Circulo.countDocuments();

  if (countAfter - countBefore === circulos.length){
    console.log('Circulos seeded con exito');
  }else{
    console.error('Ocurrio un problea con el seeding de Circulos');
  }
}catch(err){
  console.error(err);
}
};

seed ();