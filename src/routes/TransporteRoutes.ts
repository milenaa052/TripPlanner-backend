import express from "express"
import { createTransporte, deleteTransporteById, getTransporteById, getTransportes, updateTransporte } from "../controllers/TransporteController"

const router = express.Router()

router.get("/transportes", getTransportes)
router.get("/transporte/:id", getTransporteById)
router.post("/cadastro-transporte", createTransporte)
router.put("/transporte/:id", updateTransporte)
router.delete("/transporte/:id", deleteTransporteById)

export default router