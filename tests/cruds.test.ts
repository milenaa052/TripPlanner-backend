import { Request, Response } from "express"
import { updateDespesa, deleteDespesaById } from "../src/controllers/DespesaController"
import DespesaModel from "../src/models/DespesaModel"

// Mock dos módulos
jest.mock("../src/models/DespesaModel")
jest.mock("../src/middleware/authMiddleware", () => ({
    authMiddleware: jest.fn((req, res, next) => {
        req.user = { id: 1 } // Mock de usuário autenticado
        next()
    })
}))

describe("Testes das rotas de despesas", () => {
    let req: Partial<Request>
    let res: Partial<Response>
    let next: jest.Mock

    beforeEach(() => {
        req = { 
            body: {},
            params: {},
            query: {},
            headers: {}
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
        next = jest.fn()
    })

    describe("Testes de validação", () => {
        test("Erro 404 ao atualizar despesa inexistente", async () => {
            req.params = { id: "999" }
            req.body = { 
                tipoDespesa: "Transporte", 
                gasto: 100, 
                dataDespesa: "2023-01-01", 
                viagemId: 1 
            };

            (DespesaModel.findByPk as jest.Mock).mockResolvedValue(null)
            
            await updateDespesa(req as Request<{ id: string }>, res as Response)
            
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ error: "Despesa não encontrada" })
        })

        test("Erro 404 ao deletar despesa inexistente", async () => {
            (DespesaModel.findByPk as jest.Mock).mockResolvedValue(null)
            
            await deleteDespesaById(req as Request<{ id: string }>, res as Response)
            
            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith({ error: "Despesa não encontrada" })
        })
    })
})