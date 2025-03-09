import { Request, Response } from "express"
import UsuarioModel from "../models/UsuarioModel"

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await UsuarioModel.findAll()
    return res.send(usuarios)
}

export const getUsuarioById = async (req: Request<{id: number}>, res: Response) => {
    const usuarios = await UsuarioModel.findByPk(req.params.id);
    return res.json(usuarios);
}

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const { nome, cpf, email, senha } = req.body;

        if(!nome || !cpf || !email || !senha) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const usuario = await UsuarioModel.create({ 
            nome, 
            cpf, 
            email, 
            senha 
        })

        return res.status(201).json(usuario)
    } catch (error) {
        return res.status(500).json("Erro interno no servidor " + error)
    }
}

export const updateUsuario = async (req: Request<{id: number}>, res: Response) => {
    try {
        const { nome, cpf, email, senha } = req.body;

        if(!nome || !cpf || !email || !senha) {
            return res.status(400)
                .json({error: "Todos os campos são obrigatórios"})
        }

        const usuario = await UsuarioModel.findByPk(req.params.id);

        if(!usuario) {
            return res.status(404)
                .json({error: "Usuario não existe"});
        }

        usuario.nome = nome;
        usuario.cpf = cpf;
        usuario.email = email;
        usuario.senha = senha;
        
        await usuario.save();

        return res.status(201).json(usuario);
    } catch (error) {
        return res.status(500).json("Erro interno no suariovidor " + error)
    }
}

export const deleteUsuarioById = async (req: Request<{ id: number}>, res: Response) => {  
    try {
        const usuario = await UsuarioModel.findByPk(req.params.id)
        
        if(!usuario) {
            return res.status(404)
                .json({error: "Usuario não existe"})
        }

        await usuario.destroy()

        return res.status(204).send()
    } catch (error) {
        return res.status(500).json("Erro interno no suariovidor " + error)
    }
}