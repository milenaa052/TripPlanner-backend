import { Request, Response } from "express";
import PasseioModel from "../models/PasseioModel";

export const getPasseios = async (req: Request, res: Response) => {
    const passeios = await PasseioModel.findAll()
    res.status(201).json(passeios)
}

export const getPasseioById = async (req: Request<{id: number}>, res: Response) => {
    const passeio = await PasseioModel.findByPk(req.params.id)
    res.status(201).json(passeio)
}

export const createPasseio = async (req: Request, res: Response) => {
    try {
        const {
            dataPasseio,
            localPasseio,
            horaInicial,
            horaFinal,
            gastoPasseio,
            despesaId,
            viagemId
        } = req.body

        if(!dataPasseio || !localPasseio || !horaInicial || !horaFinal || !gastoPasseio || !despesaId || !viagemId) {
            res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const passeio = await PasseioModel.create({
            dataPasseio,
            localPasseio,
            horaInicial,
            horaFinal,
            gastoPasseio,
            despesaId,
            viagemId
        })

        res.status(201).json(passeio)

    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}

export const updatePasseio = async (req: Request<{id: number}>, res: Response) => {
    try {
        const { 
            dataPasseio,
            localPasseio,
            horaInicial,
            horaFinal,
            gastoPasseio,
            despesaId,
            viagemId
        } = req.body

        if(!dataPasseio || !localPasseio || !horaInicial || !horaFinal || !gastoPasseio || !despesaId || !viagemId) {
            res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const passeio = await PasseioModel.findByPk(req.params.id)

        if(!passeio) {
            res.status(400)
                .json({error: "Passeio não encontrado"})
        }

        passeio.dataPasseio = dataPasseio
        passeio.localPasseio = localPasseio
        passeio.horaInicial = horaFinal
        passeio.horaFinal = horaFinal
        passeio.gastoPasseio = gastoPasseio
        passeio.despesaId = despesaId
        passeio.viagemId = viagemId

        await passeio?.save()
        res.status(201).json(passeio)

    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}

export const deletePasseioById = async (req: Request<{id: number}>, res: Response) => {
    try{
        const passeio = await PasseioModel.findByPk(req.params.id)

        if(!passeio) {
            res.status(400)
                .json({error: "Passeio não encontrado"})
        }

        await passeio?.destroy()
        res.status(204).send()
        
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}