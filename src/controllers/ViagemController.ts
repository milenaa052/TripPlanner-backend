import { Request, Response } from "express"
import ViagemModel from "../models/ViagemModel"

export const getViagens = async (req: Request, res: Response) => {
    const viagens = await ViagemModel.findAll();
    res.send(viagens);
}

export const getViagemById = async (req: Request<{id: number}>, res: Response) => {
    const viagens = await ViagemModel.findByPk(req.params.id);
    return res.json(viagens);
}

export const createViagem = async (req: Request, res: Response) => {
    try {
        const { localOrigem, localDestino, dataInicial, dataFinal } = req.body;

        if(!localOrigem || !localDestino || !dataInicial || !dataFinal) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const viagem = await ViagemModel.create({ 
            localOrigem, 
            localDestino, 
            dataInicial, 
            dataFinal 
        })
        
        res.status(201).json(viagem)
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}

export const updateViagem = async (req: Request<{id: number}>, res: Response) => {
    try {
        const { localOrigem, localDestino, dataInicial, dataFinal } = req.body;

        if(!localOrigem || !localDestino || !dataInicial || !dataFinal) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const viagem = await ViagemModel.findByPk(req.params.id);

        if(!viagem) {
            return res.status(404)
                .json({error: "Viagem nãoo encontrada"});
        }

        viagem.localOrigem = localOrigem;
        viagem.localDestino = localDestino;
        viagem.dataInicial = dataInicial;
        viagem.dataFinal = dataFinal;
        
        await viagem.save();

        res.status(201).json(viagem);
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}

export const deleteViagemById = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const viagem = await ViagemModel.findByPk(req.params.id)
        
        if(!viagem) {
            res.status(404)
                .json({error: "Viagem não encontrada"})
        }

        await viagem?.destroy()

        res.status(204).send()
    } catch (error) {
        res.status(500).json("Erro interno no servidor " + error)
    }
}