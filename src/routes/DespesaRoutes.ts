import express  from "express"
import { createDespesa, deleteDespesaById, getDespesas, getDespesasById, updateDespesa } from "../controllers/DespesaController"

const router = express.Router()

router.get("/despesas", getDespesas)
router.get("despesa/:id", getDespesasById)
router.post("/cadastro-despesa", createDespesa)
router.put("/despesa/:id", updateDespesa)
router.delete("/despesa/:id", deleteDespesaById)

export default router;