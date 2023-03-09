const User = require('../../schemas/user.schema');
const bcrypt = require('bcryptjs');
const validatePassword = require('../../validations/validatePassword');

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json new User added
 */
const AddUser = async (req, res) => {  
  const user = new User(req.body);
  const userNuevo = await user.save();
  if (!userNuevo) {
    const error = new Error();
    error.message = 'Error al guardar usuario';
    throw error;
    }
    res.status(201).send(user).json({ message: 'Usuario creado' });
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json Users List 
 */
const FindAllUsers = async (req, res) => {
    const users = await User.find({});
    if(!users) {
      const error = new Error();
      error.status = 404;
      error.message = 'No hay usuarios para mostrar';
      throw error;
    }
   return res.status(200).json(users);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res and json one User by Id
 */
const FindSingleUser = async (req, res) => {
  if (!req.params.id) {
    const error = new Error();
    error.status = 400;
    error.message = 'Id no valido';
    throw error;
  }
  
  const user = await User.findById(req.params.id);
  if (!user) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el usuario que busca';
    throw error;
  }
  return res.status(200).send(user);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res status 200 and json User updated
 */
const UpdateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error();
      error.status = 404;
      error.message = 'No se encontró el usuario';
      throw error;
    }
    
    if (req.body.password) {
      // validar formato correccto de password
      const isPasswordValid = await validatePassword(req.body);
      if (!isPasswordValid) {
        const error = new Error();
        error.status = 404;
        throw error;
      }

      // validar que la nueva no sea igual a la anterior
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
      if (isPasswordMatch) {
        const error = new Error();
        error.status = 404;
        error.message = 'La nueva contraseña debe ser diferente a la actual';
        throw error;
      }
    }
    const updatedUser = await User.findByIdAndUpdate (req.params.id, req.body, { new: true });
    return res.status(200).send(updatedUser);
};

/**
 * @param  {} req
 * @param  {} res
 * @return {} res status 204 no data
 */
const DeleteUser = async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   return res.status(400).json({ message: 'ID inválido' });
  // }
  const user = await User.findById(req.params.id);
  if (!user) {
    const error = new Error();
    error.status = 404;
    error.message = 'No se encontró el usuario';
    throw error;
  }
  await User.findByIdAndDelete(req.params.id);
  return res.sendStatus(204);
};

module.exports = { AddUser, FindAllUsers , FindSingleUser, UpdateUser, DeleteUser };
