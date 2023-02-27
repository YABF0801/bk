const User = require('../../schemas/user.schema');
const userDataValidation = require('../../validations/user.validations');
const bcrypt = require('bcryptjs');
const validatePassword = require('../../validations/validatePassword');
const mongoose = require('mongoose');

const AddUser = async (req, res) => {
  const { errors, isDataValid } = await userDataValidation(req.body);
  if (!isDataValid) return res.status(400).json(errors);
    
  const existsById = await User.findById(req.body._id).exec();
  if (existsById) return res.status(409).json({ message:'Ya existe un Usuario con ese id registrado'});

  const existsByNickname = await User.findOne({ nickname: req.body.nickname }).exec();
  if (existsByNickname) return res.status(409).json({ message:'Ya existe un Usuario con ese nickname registrado'});

  const user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      return res.status(500).send({ message: "Error al guardar usuario" });
    }
    if (!user) {
      return res.status(404).send({ message: "No se ha podido guardar usuario" });
    }
    res.status(201).send(user).json({ message: 'Usuario creado' });
  })
};

const FindAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ nickname: 1 });
    if(!users) return res.status(404).send({message: "No hay usuarios para mostrar"});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error al extraer los datos", error });
  }
};

const FindSingleUserByNickname = async (req, res) => {
  try {
    if (!req.params.nickname) return res.status(400).json({ message: "No se ha especificado un nickname" });

    const user = await User.findOne({ nickname: req.params.nickname }).exec();
    if (!user) return res.status(404).json({ message: "No se encontró el usuario con ese nombre" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error al buscar el usuario", error });
  }
};

const FindSingleUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'El ID enviado no es válido' });
    }
  
  const user = await User.findById(req.params.id).exec();
  if (!user) return res.status(404).send({ errors: ['No encuentro el usuario que busca'] });
  
  return res.status(200).send(user);
}catch (error) {
  return res.status(500).json({ message: "Error al buscar el usuario", error });
}
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

module.exports = { AddUser, FindAllUsers , FindSingleUserByNickname, FindSingleUserById, UpdateUser, DeleteUser };
