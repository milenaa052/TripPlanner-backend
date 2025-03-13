import { Request, Response } from "express";
import PasseioModel from "../models/PasseioModel";

export const getPasseios = async (req: Request, res: Response) => {
    const passeios = await PasseioModel.findAll()
    return res.status(201).json(passeios)
}

export const getPasseioById = async (req: Request<{id: number}>, res: Response) => {
    const passeio = await PasseioModel.findByPk(req.params.id)
    return res.status(201).json(passeio)
}

export const createPasseio = async (req: Request, res: Response) => {
    try {
        const {
            dataPasseio,
            localPasseio,
            horaInicial,
            horaFinal,
            gastoPasseio,
            viagemId
        } = req.body

        if(!dataPasseio || !localPasseio || !horaInicial || !horaFinal || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const passeio = await PasseioModel.create({
            dataPasseio,
            localPasseio,
            horaInicial,
            horaFinal,
            gastoPasseio,
            viagemId
        })

        return res.status(201).json(passeio)

    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
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
            viagemId
        } = req.body

        if(!dataPasseio || !localPasseio || !horaInicial || !horaFinal || !viagemId) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const passeio = await PasseioModel.findByPk(req.params.id)

        if(!passeio) {
            return res.status(400)
                .json({error: "Passeio não encontrado"})
        }

        passeio.dataPasseio = dataPasseio
        passeio.localPasseio = localPasseio
        passeio.horaInicial = horaFinal
        passeio.horaFinal = horaFinal
        passeio.gastoPasseio = gastoPasseio
        passeio.viagemId = viagemId

        await passeio.save()
        return res.status(201).json(passeio)

    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
    }
}

export const deletePasseioById = async (req: Request<{id: number}>, res: Response) => {
    try{
        const passeio = await PasseioModel.findByPk(req.params.id)

        if(!passeio) {
            return res.status(400)
                .json({error: "Passeio não encontrado"})
        }

        await passeio?.destroy()
        return res.status(204).send()
        
    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
    }
}