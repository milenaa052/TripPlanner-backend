import express from "express"
import { loginUsuario, getUsuarioLogado } from "../controllers/loginController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.get("/usuario/perfil", authMiddleware, getUsuarioLogado)
router.post("/login", loginUsuario)

export default router