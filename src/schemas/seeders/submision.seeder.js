const Submision = require('../submision.schema');

const submisions = [
  // Submision 1 data

{
  finality: 'om',
  submisiontype: 'new',
  entryNumber: 201,
  socialCase: false,
  motive: 'Necesito trabajar',
  status: 'pendiente',
  ciPedido: 'Nene Traviesa',
  weight: 0,

  child: {
      childName: 'Pedro',
      childLastname: 'Gonzales Ge',
      carnet: 20022524682,
      sex: 'masculino',
      age: 2,
      year_of_life: 3,
      childAdress: 'calle 16 #5120 entre 51 y 53',
      neighborhood: 'Abel Santamaria',
      cPopular: 'Abel Santamaria',
      municipality: 'Isla de la Juventud',
      province: 'Isla de la Juventud',
      circulo: {},
      lat: 21.89074381564486,
      lon: -82.80854896987798,

      parents: [
        {
          parentName: 'Elena',
          parentLastname: 'Ge',
          uniqueParent: false,
          typeParent: 'madre',
          convivencia: true,
          parentAddress: 'calle 16 #5120 entre 51 y 53',
          phoneNumber: 46352000,
          occupation: 'trabajador',
          workName: 'CIMEX IJ',
          workAddress: 'cimex isla',
          jobTitle: 'Jefa de departamento comercial',
          organismo: {
              name: 'CIMEX',
              weight: 0},
          salary: 4500,
          otherChildrenInCi: false,
          numberOfOtherChildrenInCi: 0,
          otherChildrenCenter: null ,
          pregnant: false,
          deaf: false    
        },
        {
        parentName: 'Pedro',
        parentLastname: 'Gonzales',
        typeParent: 'padre',
        convivencia: true,
        parentAddress: 'calle 16 #5120 entre 51 y 53',
        phoneNumber: 55555555,
        occupation: 'trabajador',
        workName: 'MINAG IJ',
        workAddress: 'direccion minag isla',
        jobTitle: 'Chofer',
        salary: 3900
      }]
    },
},

// Submision 2 data
{
  finality: 'om',
  submisiontype: 'new',
  entryNumber: 202,
  socialCase: false,
  motive: 'Necesito ayuda para cuidar el hijo',
  status: 'pendiente',
  weight: 4,

  child: {
      childName: 'Carolina',
      childLastname: 'Herrera Hitch',
      carnet: 22041065771,
      sex: 'femenino',
      age: 1,
      year_of_life: 2,
      childAdress: 'calle 4 #4B entre E y 3',
      neighborhood: 'Micro 70',
      cPopular: 'Micro 70',
      municipality: 'Isla de la Juventud',
      province: 'Isla de la Juventud',
      circulo: {},
      lat: 21.89561704365498,
      lon: -82.8080816567331,
      
      parents: [
        {
          parentName: 'Fernanda',
          parentLastname: 'Hitch',
          uniqueParent: false,
          typeParent: 'madre',
          convivencia: true,
          parentAddress: 'calle 4 #4B entre E y 3',
          phoneNumber: 42332000,
          occupation: 'trabajador',
          workName: 'HBB',
          workAddress: 'HBB direccion',
          jobTitle: 'Recepcionista',
          organismo: {
              name: 'MINSAP',
              weight: 2},
          salary: 4000,
          otherChildrenInCi: false,
          numberOfOtherChildrenInCi: 0,
          otherChildrenCenter: null ,
          pregnant: true,
          deaf: false    
        },
        {
        parentName: 'Pedro',
        parentLastname: 'Gonzales',
        typeParent: 'padre',
        convivencia: true,
        parentAddress: 'calle 16 #5120 entre 51 y 53',
        phoneNumber: 55555555,
        occupation: 'trabajador',
        workName: 'MINAG IJ',
        workAddress: 'direccion minag isla',
        jobTitle: 'Chofer',
        salary: 3900
        }]
  },
},

// Submision 3 data
{
  finality: 'om',
  submisiontype: 'new',
  entryNumber: 203,
  socialCase: true,
  motive: 'Necesito trabajar tambien',
  status: 'pendiente',
  weight: 21,

  child: {
    childName: 'Hector',
    childLastname: 'Bell Llanes',
    carnet: 22051524762,
    sex: 'masculino',
    age: 1,
    year_of_life: 2,
    childAdress: 'calle 16 #5122 entre 51 y 53',
    neighborhood: 'Abel Santamaria',
    cPopular: 'Abel Santamaria',
    municipality: 'Isla de la Juventud',
    province: 'Isla de la Juventud',
    circulo: {},
    lat: 21.89074381564486,
    lon: -82.80854896987798,

    parents: [
        {
        parentName: 'Nadia',
        parentLastname: 'Bell Llanes',
        uniqueParent: true,
        typeParent: 'madre',
        convivencia: true,
        parentAddress: 'calle 16 #5122 entre 51 y 53',
        phoneNumber: 46328888,
        occupation: 'asistenciado',
        salary: 2500,
        otherChildrenInCi: false,
        numberOfOtherChildrenInCi: 0,
        otherChildrenCenter: null,
        pregnant: false,
        deaf: false    
        }]
  },
},

// Submision 4 data
{
  finality: 'om',
  submisiontype: 'traslado',
  entryNumber: 204,
  socialCase: false,
  motive: 'Porque me mude para otro lado',
  status: 'PENDIENTE',
  weight: 38,

  child: {
    childName: 'Lia ',
    childLastname: 'Romero Moya',
    carnet: 22121065291,
    sex: 'femenino',
    age: 1,
    year_of_life: 2,
    childAdress: 'calle E #568 entre 4b y D',
    neighborhood: 'Micro 70',
    cPopular: 'Micro 70',
    municipality: 'Isla de la Juventud',
    province: 'Isla de la Juventud',
    circulo: {},
    lat: 21.89561704365498,
    lon: -82.8080816567331,
    
    parents: [
        {
        parentName: 'Leyanis',
        parentLastname: 'Moya',
        uniqueParent: false,
        typeParent: 'madre',
        convivencia: true,
        parentAddress: 'calle E #568 entre 4b y D',
        phoneNumber: 42327777,
        occupation: 'trabajador',
        workName: 'GeoCuba IJ',
        workAddress: 'GeoCuba direccion',
        jobTitle: 'Director',
        organismo: {
            name: 'GEOCUBA',
            weight: 0},
        salary: 5600,
        otherChildrenInCi: true,
        numberOfOtherChildrenInCi: 1,
        otherChildrenCenter: 'Meñique' ,
        pregnant: true,
        deaf: false    
        },
        {
        parentName: 'Angel',
        parentLastname: 'Romero',
        typeParent: 'padre',
        convivencia: false,
        parentAddress: 'Habana',
        phoneNumber: 55776644,
        occupation: 'trabajador',
        workName: 'Electrica de C.Hab',
        workAddress: 'direccion X',
        jobTitle: 'Liniero',
        salary: 6000
        }]
  },
},
];

const seed = async () => {
try {
  const countBefore = await Submision.countDocuments();
  await Submision.deleteMany();
  await Submision.create(submisions);
  const countAfter = await Submision.countDocuments();

  if (countAfter - countBefore === submisions.length){
    console.log('Submisions seeded con exito');
  }else{
    console.error('Ocurrio un problema con el seeding de Submisions');
  }
}catch(err){
  console.error(err);
}
};

seed ();