import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ViagemModel from "./ViagemModel";

class DespesaModel extends Model {
    idDespesa: number | undefined
    tipoDespesa: string | undefined
    gasto: number | undefined
    dataDespesa: Date | undefined
    viagemId: number | undefined
}

DespesaModel.init({
    idDespesa: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipoDespesa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gasto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dataDespesa: {
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
    modelName: "DespesaModel",
    tableName: "despesas" 
})

DespesaModel.belongsTo(ViagemModel, {
    foreignKey: "viagemId",
    as: "viagens"
})

export default DespesaModel;