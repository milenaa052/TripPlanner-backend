import { UsuarioTokenPayload } from "../UsuarioTokenPayload"

declare global {
  namespace Express {
    interface Request {
      usuario?: UsuarioTokenPayload
    }
  }
}