const Tools = require('../tools.schema');

async function seed() {
  const nowDate = new Date();
  const currentYear = nowDate.getFullYear();

  const toolsDb = {
    uniqueValue: 'tools',
    consecutive: 0,
    omDate: null,
    contadorGP: 0,
    contadorCC: 0,
    contadorAcept: 0,
    circulosParaGP: [],
    proyeccionParaGP: [],
    curso: currentYear,
  };

  try {
    await Tools.create(toolsDb);
    console.log('Documento creado exitosamente en la colección "tools".');
  } catch (error) {
    console.error('Error al crear el documento en la colección "tools":', error);
  }
}

seed();
