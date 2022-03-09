const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");

const usuariosGet = (req = request, res = response) => {
  res.json({
    msg: "GET usuarios",
  });
};
const usuariosPost = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;

  const usuario = new Usuario({ nombre, email, password, rol });

  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt, { new: true });

  await usuario.save();

  res.json({
    msg: "Usuario creado",
    usuario,
  });
};
const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, rol, ...resto } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "PUT usuarios",
    usuario,
  });
};
const usuariosDelete = async (req = request, res = response) => {
  const id = req.params.id;
  // const {estado} = req.body

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: "DELETE usuarios",
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
