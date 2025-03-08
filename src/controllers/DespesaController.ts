import { Request, Response } from "express"
import DespesaModel from "../models/DespesaModel"

export const getDespesas = async (req: Request, res: Response) => {
    const despesas = await DespesaModel.findAll()
    res.send(despesas)
}

export const getDespesasById = async (req: Request<{id: number}>, res: Response) => {
    const despesa = await DespesaModel.findByPk(req.params.id);
    return res.json(despesa)
}

export const createDespesa = async (req: Request, res: Response) => {
    try {
        const { tipoDespesa, gasto, dataDespesa, viagemId } = req.body

        if(!tipoDespesa || !gasto || !dataDespesa || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const despesa = await DespesaModel.create({
            tipoDespesa,
            gasto,
            dataDespesa,
            viagemId
        })

        res.status(201).json(despesa)

    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}

export const updateDespesa = async (req: Request<{id: number}>, res: Response) => {
    try {
        const { tipoDespesa, gasto, dataDespesa, viagemId } = req.body

        if(!tipoDespesa || !gasto || !dataDespesa || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const despesa = await DespesaModel.findByPk(req.params.id)

        if(!despesa) {
            return res.status(400)
                .json({error: "Despesa não encontrada."})
        }

        despesa.tipoDespesa = tipoDespesa
        despesa.gasto = gasto
        despesa.dataDespesa = dataDespesa
        despesa.viagemId = viagemId

        await despesa.save()
        res.status(201).json(despesa)

    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}

export const deleteDespesaById = async (req: Request<{id: number}>, res: Response) => {
    try {
        const despesa = await DespesaModel.findByPk(req.params.id)

        if(!despesa) {
            res.status(400)
                .json({error: "Despesa não encontrada"})
        }

        await despesa?.destroy()
        
        res.status(204).send()
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}