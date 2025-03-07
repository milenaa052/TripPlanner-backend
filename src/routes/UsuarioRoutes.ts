import express from "express"
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuarioById } from "../controllers/UsuarioController"

const router = express.Router();

router.get("/usuarios", getUsuarios);
router.get("/usuario/:id", getUsuarioById)
router.post("/cadastro-usuario", createUsuario)
router.put("/usuario/:id", updateUsuario)
router.delete("/usuario/:id", deleteUsuarioById)

export default router;