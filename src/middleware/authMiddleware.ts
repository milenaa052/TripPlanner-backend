import { NextFunction, Request, Response } from "express"
import { verificaToken } from "../utils/jwt"
import { UsuarioTokenPayload } from "../types/UsuarioTokenPayload"

declare module "express-serve-static-core" {
    interface Request {
        usuario?: UsuarioTokenPayload
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if(!token) {
        return res.status(401)
            .json({error: "Acesso não autorizado"})
    }

    try {
        const decoded = verificaToken(token) as UsuarioTokenPayload
        req.usuario = decoded
        next()
    } catch (error) {
        return res.status(401)
            .json({error: "Acesso não autorizado"})
    }
}