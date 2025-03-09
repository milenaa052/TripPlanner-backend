import { Request, Response } from "express";
import HospedagemModel from "../models/HospedagemModel";

export const getHospedagens = async (req: Request, res: Response) => {
    const hospedagens = await HospedagemModel.findAll()
   return res.status(201).json(hospedagens)
}

export const getHospedagemById = async (req: Request<{id: number}>, res: Response) => {
    const hospedagem = await HospedagemModel.findByPk(req.params.id)
    return res.status(201).json(hospedagem)
}

export const createHospedagem = async (req: Request, res: Response) => {
    try {
        const { 
            localHospedagem, 
            dataCheckin, 
            dataCheckout, 
            gastoTotal, 
            despesaId, 
            viagemId 
        } = req.body

        if(!localHospedagem || !dataCheckin || !dataCheckout || !gastoTotal || !despesaId || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos devem ser preenchidos"})
        }

        const hospedagem = await HospedagemModel.create({
            localHospedagem,
            dataCheckin,
            dataCheckout,
            gastoTotal,
            despesaId,
            viagemId
        })

        return res.status(201).json(hospedagem)

    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
    }
}

export const updateHospedagem = async (req: Request<{id: number}>, res: Response) => {
    try {
        const { 
            localHospedagem,
            dataCheckin,
            dataCheckout,
            gastoTotal,
            despesaId,
            viagemId
        } = req.body

        if(!localHospedagem || !dataCheckin || !dataCheckout || !gastoTotal || !despesaId || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const hospedagem = await HospedagemModel.findByPk(req.params.id)

        if(!hospedagem) {
            return res.status(400)
                .json({error: "Hospedagem não encontrada"})
        }

        hospedagem.localHospedagem = localHospedagem
        hospedagem.dataCheckin = dataCheckin
        hospedagem.dataCheckout = dataCheckout
        hospedagem.gastoTotal = gastoTotal
        hospedagem.despesaId = despesaId
        hospedagem.viagemId = viagemId

        await hospedagem.save()
        return res.status(201).json(hospedagem)

    } catch (error) {
       return res.status(500).json("Erro interno no servidor " + error)
    }
}

export const deleteHospedagemById = async (req: Request<{id: number}>, res: Response) => {
    try {
        const hospedagem = await HospedagemModel.findByPk(req.params.id)

        if(!hospedagem) {
            res.status(400)
                .json({error: "Hospedagem não encontrada"})
        }

        await hospedagem?.destroy()
        return res.status(204).send()

    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
    }
}