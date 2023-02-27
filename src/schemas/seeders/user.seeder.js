const User = require('../user.schema');
const bcrypt = require('bcrypt');

const users = [
  {
    nickname: 'Yabf',
    name: 'Yanet',
    lastname: 'Brito',
    password: bcrypt.hashSync('Password123', 10),
    position: 'jefa de todo',
    role: 'admin'
  },
{
  nickname: 'Nemo',
  name: 'Beatriz',
  lastname: 'Rios',
  password: bcrypt.hashSync('Password456', 10),
  position: 'jefa de algo',
  role: 'admin'
},
{
  nickname: 'Json',
  name: 'Jakeline',
  lastname: 'Sonoro',
  password: bcrypt.hashSync('password789', 10),
  position: 'no jefa',
  role: 'guest'
},
];

const seed = async () => {
try {
  const countBefore = await User.countDocuments();
  await User.deleteMany();
  await User.create(users);
  const countAfter = await User.countDocuments();

  if (countAfter - countBefore === users.length){
    console.log('Users seeded con exito');
  }else{
    console.error('Ocurrio un problema con el seeding de Users');
  }
}catch(err){
  console.error(err);
}
};

seed ();
