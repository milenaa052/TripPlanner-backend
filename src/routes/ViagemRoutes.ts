import express from "express"
import { getViagens, getViagemById, createViagem, updateViagem, deleteViagemById } from "../controllers/ViagemController"

const router = express.Router();

router.get("/viagens", getViagens);
router.get("/viagem/:id", getViagemById)
router.post("/cadastro-viagem", createViagem)
router.put("/viagem/:id", updateViagem)
router.delete("/viagem/:id", deleteViagemById)

export default router;