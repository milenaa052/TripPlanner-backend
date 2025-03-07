import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UsuarioModel extends Model {
    idUsuario: number | undefined
    nome: string | undefined
    cpf: string | undefined
    email: string | undefined
    senha: string | undefined
}

UsuarioModel.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "UsuarioModel",
    tableName: "usuarios"
})

export default UsuarioModel