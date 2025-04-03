import jwt from "jsonwebtoken"
import UsuarioModel from "../models/UsuarioModel"

const JWT_SECRETA = process.env.JWT_SECRETA || "chave"
const JWT_EXPIRA_EM = "7d"

export const gerarToken = (usuario: UsuarioModel): string => {
    return jwt.sign({ usuario }, JWT_SECRETA, { expiresIn: JWT_EXPIRA_EM })
}

export const verificaToken = (token: string) => {
    return jwt.verify(token, JWT_SECRETA)
}