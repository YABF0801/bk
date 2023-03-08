const mongoose = require('mongoose');
const User = require('../../schemas/user.schema');
const bcrypt = require('bcryptjs');
const validatePassword = require('../../validations/validatePassword');
// const {userDataValidation} = require('../../validations/user.validations');

const AddUser = async (req, res) => {
 // const { errors, isDataValid } = await userDataValidation(req.body);
 // if (!isDataValid) return res.status(400).json(errors);
    
  const user = new User(req.body);
  const userNuevo = await user.save();
  if (!userNuevo) {
    const error = new Error();
    error.message = 'Error al guardar usuario';
    throw error;
    }
    res.status(201).send(user).json({ message: 'Usuario creado' });
};

const FindAllUsers = async (req, res) => {
   // Obtener todos los usuarios 
    const users = await User.find({});
    if(!users) {
      const error = new Error();
      error.status = 404;
      error.message = 'No hay usuarios para mostrar';
      throw error;
    }
   return res.status(200).json(users);
};

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

const UpdateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID enviado no es válido' });
    }
    else{    
    const { errors, isDataValid } = await userDataValidation(req.body);
    if (!isDataValid) return res.status(400).json(errors);

    const user = await User.findById(req.params.id).exec();
    if (!user) return res.status(404).send({ message: "No se encontró el usuario" });

    const existsByNickname = await User.findOne({ nickname: req.body.nickname }).exec();
    if (existsByNickname && existsByNickname._id !== req.params.id) 
      return res.status(409).send({ message: "Ya existe un usuario con ese nickname" });
    }
    
    if (req.body.password) {
      // validar formato correccto de password
      const { errors, isPasswordValid } = await validatePassword(req.body);
      if (!isPasswordValid) return res.status(400).json(errors);

      // validar que la nueva no sea igual a la anterior
      const user = await User.findById(req.params.id).exec();
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
      if (isPasswordMatch) {
          return res.status(400).json({ message: 'La nueva contraseña debe ser diferente a la actual' });
        }
    }

      // actualizar usuario
    const updatedUser = await User.findByIdAndUpdate (req.params.id, req.body, { new: true }).exec();
    return res.status(200).send(updatedUser).json({ message: 'Usuario actualizado'});;
  } catch (error) {
    return res.status(500).send({ message: "Error al actualizar el usuario" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID inválido' });
      }
      const deletedUser = await User.findByIdAndDelete(req.params.id).exec();
      if (!deletedUser) return res.status(404).json({ message: 'No se encontró el usuario' });
      return res.status(200).json({ message: 'Usuario eliminado', deletedUser });
  }catch (error) {
    return res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
};

module.exports = { AddUser, FindAllUsers , FindSingleUser, UpdateUser, DeleteUser };
