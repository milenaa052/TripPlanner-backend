import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from 'bcrypt';

class UsuarioModel extends Model {
    idUsuario: number | undefined
    nome: string | undefined
    cpf: string | undefined
    email: string | undefined
    senha: string | undefined

    public async hashSenha() {
        this.senha = await bcrypt.hash(this.senha!, 10)
    }
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

UsuarioModel.beforeCreate(async (usuario: UsuarioModel) => {
    await usuario.hashSenha()
});

UsuarioModel.beforeUpdate(async (usuario: UsuarioModel) => {
    if(usuario.changed('senha')) {
        await usuario.hashSenha()
    }
});

export default UsuarioModel