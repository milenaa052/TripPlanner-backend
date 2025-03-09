import express from "express"
import { createPasseio, deletePasseioById, getPasseioById, getPasseios, updatePasseio } from "../controllers/PasseioController"

const router = express.Router()

router.get("/passeios", getPasseios)
router.get("/passeio/:id", getPasseioById)
router.post("/cadastro-passeio", createPasseio)
router.put("/passeio/:id", updatePasseio)
router.delete("/passeio/:id", deletePasseioById)

export default router;