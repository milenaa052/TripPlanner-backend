import { Request, Response } from "express";
import UsuarioModel from "../models/UsuarioModel";
import {gerarToken } from "../utils/jwt"

export const loginUsuario = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    if(!email || !senha) {
        return res.status(400)
            .json({error: "Email ou senha são obrigatórios"})
    }

    const usuario = await UsuarioModel.findOne({ where: { email } })
    if(!usuario) {
        return res.status(404)
            .json({error: "Usuário não encontrado"})
    }

    const senhaValidada = await usuario.validarSenha(senha);

    if(!senhaValidada) {
        return res.status(400)
            .json({error: "Email ou senha inválidos"})
    }

    const token = gerarToken(usuario)

    return res.status(200).json({mensagem: "Login realizado com sucesso", token})
}