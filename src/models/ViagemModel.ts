import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ViagemModel extends Model {
    idViagem: number | undefined
    localOrigem: string | undefined
    localDestino: string | undefined
    dataInicial: Date | undefined
    dataFinal: Date | undefined
}

ViagemModel.init({
    idViagem: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    localOrigem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localDestino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataInicial: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataFinal: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "ViagemModel",
    tableName: "viagens"
})

export default ViagemModel;