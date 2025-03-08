import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import DespesaModel from "./DespesaModel";
import ViagemModel from "./ViagemModel";

class PasseioModel extends Model {
    idPasseio: number | undefined
    dataPasseio: Date | undefined
    localPasseio: string | undefined
    horaInicial: string | undefined
    horaFinal: string | undefined
    gastoPasseio: number | undefined
    despesaId: number | undefined
    viagemId: number | undefined
}

PasseioModel.init({
    idPasseio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dataPasseio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    localPasseio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horaInicial: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaFinal: {
        type: DataTypes.TIME,
        allowNull: false
    },
    gastoPasseio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    despesaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    viagemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "PasseioModel",
    tableName: "passeio"
})

PasseioModel.belongsTo(DespesaModel, {
    foreignKey: "despesaId",
    as: "despesas"
})

PasseioModel.belongsTo(ViagemModel, {
    foreignKey: "viagemId",
    as: "viagens"
})

export default PasseioModel;