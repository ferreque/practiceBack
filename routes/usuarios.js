const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste, idExiste } = require("../helpers/db-validators");
const router = Router();
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),

    check("password", "La contraseña es obligatoria").not().isEmpty().trim(),
    check(
      "password",
      "La contraseña debe tener al mínimo 6 caracteres"
    ).isLength({
      min: 6,
    }),
    check("email", "No es un correo válido").isEmail(),
    check("email").custom(emailExiste),
    check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "El Id es inválido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosPut
);

router.delete("/:id", usuariosDelete);

module.exports = router;
