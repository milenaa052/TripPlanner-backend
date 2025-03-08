import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import DespesaModel from "./DespesaModel";
import ViagemModel from "./ViagemModel";

class TransporteModel extends Model {
    idTransporte: number | undefined
    tipoTransporte: string | undefined
    origemTransporte: string | undefined
    destinoTransporte: string | undefined
    gastoTransporte: number | undefined
    dataTransporte: Date | undefined
    despesaId: number | undefined
    viagemId: number | undefined
}

TransporteModel.init({
    idTransporte: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipoTransporte: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    origemTransporte: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    destinoTransporte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gastoTransporte: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dataTransporte: {
        type: DataTypes.DATE,
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
    modelName: "TrabnsporteModel",
    tableName: "transporte"
})

TransporteModel.belongsTo(DespesaModel, {
    foreignKey: "despesaId",
    as: "despesas"
})

TransporteModel.belongsTo(ViagemModel, {
    foreignKey: "viagenId",
    as: "viagens"
})

export default TransporteModel;