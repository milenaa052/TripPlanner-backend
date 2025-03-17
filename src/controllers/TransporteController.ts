import { Request, Response } from "express";
import TransporteModel from "../models/TransporteModel";

export const getTransportes = async (req: Request, res: Response) => {
    const transportes = await TransporteModel.findAll()
    return res.status(201).json(transportes)
}

export const getTransporteById = async (req: Request<{id: number}>, res: Response) => {
    const transporte = await TransporteModel.findByPk(req.params.id)
    return res.status(201).json(transporte)
}

export const createTransporte = async (req: Request, res: Response) => {
    try {
        const {
            tipoTransporte,
            origemTransporte,
            destinoTransporte,
            gastoTransporte,
            dataTransporte,
            viagemId
        } = req.body

        if(!tipoTransporte || !origemTransporte || !destinoTransporte || !dataTransporte || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const transporte = await TransporteModel.create({
            tipoTransporte,
            origemTransporte,
            destinoTransporte,
            gastoTransporte,
            dataTransporte,
            viagemId
        })

        return res.status(201).json(transporte)

    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
    }
}

export const updateTransporte = async (req: Request<{id: number}>, res: Response) => {
    try {
        const { 
            tipoTransporte,
            origemTransporte,
            destinoTransporte,
            gastoTransporte,
            dataTransporte,
            viagemId
        } = req.body

        if(!tipoTransporte || !origemTransporte || !destinoTransporte || !dataTransporte || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const transporte = await TransporteModel.findByPk(req.params.id)

        if(!transporte) {
            return res.status(400)
                .json({error: "Transporte não encontrado"})
        }

        transporte.tipoTransporte = tipoTransporte
        transporte.origemTransporte = origemTransporte
        transporte.destinoTransporte = destinoTransporte
        transporte.gastoTransporte = gastoTransporte
        transporte.dataTransporte = dataTransporte
        transporte.viagemId = viagemId

        await transporte.save()
        return res.status(201).json(transporte)

    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
    }
}

export const deleteTransporteById = async (req: Request<{id: number}>, res: Response) => {
    try{
        const transporte = await TransporteModel.findByPk(req.params.id)

        if(!transporte) {
            return res.status(400)
                .json({error: "Transporte não encontrado"})
        }

        await transporte?.destroy()
        return res.status(204).send()
        
    } catch (error) {
        
        return res.status(500).json("Erro interno no servidor " + error)
    }
}