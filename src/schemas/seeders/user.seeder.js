const User = require("../user.schema");

async function seed() {
  const userDb = {
    nickname: 'Administrador',
    name: 'Usuario',
    lastname: 'Administrador',
    password: 'Contrasena123',
    position: 'Cargo',
    role: 'admin',
  };

  try {
    await User.create(userDb);
    console.log('Usuario creado exitosamente.');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
}

seed();
