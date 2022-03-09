const Usuario = require("../models/usuario");

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuantra registrado`);
  }
};

const idExiste = async (id) => {
  const existeId = await Usuario.findById(id);

  if (!existeId) {
    throw Error("El id no existe");
  }
};

module.exports = {
  emailExiste,
  idExiste,
};
