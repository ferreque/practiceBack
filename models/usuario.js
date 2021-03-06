const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    require: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
module.exports = model("Usuario", UsuarioSchema);
