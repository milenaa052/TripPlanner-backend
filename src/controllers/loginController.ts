import { Request, Response } from "express"
import { gerarToken } from "../utils/jwt"
import UsuarioModel from "../models/UsuarioModel"

export const loginUsuario = async (req: Request, res: Response) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400)
            .json({ error: "Email e senha são obrigatórios" })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
        return res.status(400)
            .json({ error: "Formato de e-mail inválido" })
    }

    try {
        const usuario = await UsuarioModel.findOne({ where: { email } })

        if (!usuario) {
            return res.status(404)
                .json({ error: "Usuário não encontrado" })
        }

        const senhaValidada = await usuario.validarSenha(senha)

        if (!senhaValidada) {
            return res.status(401)
                .json({ error: "Credenciais inválidas" })
        }

        const token = gerarToken(usuario)

        return res.status(200).json({
            mensagem: "Login realizado com sucesso",
            token,
            usuario: {
                id: usuario.idUsuario,
                nome: usuario.nome,
                cpfUsuario: usuario.cpfUsuario,
                email: usuario.email
            }
        })

    } catch (error) {
        console.error("Erro no login:", error)
        return res.status(500).json({ error: "Erro interno no servidor" })
    }
}

export const getUsuarioLogado = async (req: Request, res: Response) => {
    console.log("Usuário logado:", req.usuario)

    if (!req.usuario) {
        return res.status(401).json({ error: "Usuário não autenticado" })
    }

    return res.status(200).json({
        usuario: req.usuario
    })
}