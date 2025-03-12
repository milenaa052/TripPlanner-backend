import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ViagemModel from "./ViagemModel";

class TransporteModel extends Model {
    idTransporte: number | undefined
    tipoTransporte: string | undefined
    origemTransporte: string | undefined
    destinoTransporte: string | undefined
    gastoTransporte: number | undefined
    dataTransporte: Date | undefined
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
    viagemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "TransporteModel",
    tableName: "transportes",
})

TransporteModel.belongsTo(ViagemModel, {
    foreignKey: "viagenId",
    as: "viagens"
})

ViagemModel.hasMany(TransporteModel, {
    foreignKey: "viagemId",
    as: "transportes"
})

export default TransporteModel;