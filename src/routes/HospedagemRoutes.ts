import express from "express"
import { createHospedagem, deleteHospedagemById, getHospedagemById, getHospedagens, updateHospedagem } from "../controllers/HospedagemController"

const router = express.Router()

router.get("/hospedagens", getHospedagens)
router.get("/hospedagem/:id", getHospedagemById)
router.post("/cadastro-hospedagem", createHospedagem)
router.put("/hospedagem/:id", updateHospedagem)
router.delete("/hospedagem/:id", deleteHospedagemById)

export default router