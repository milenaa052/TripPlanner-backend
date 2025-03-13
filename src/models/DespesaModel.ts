import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ViagemModel from "./ViagemModel";
import HospedagemModel from "./HospedagemModel";
import TransporteModel from "./TransporteModel";
import PasseioModel from "./PasseioModel";

class DespesaModel extends Model {
    idDespesa: number | undefined
    tipoDespesa: string | undefined
    gasto: number | undefined
    dataDespesa: Date | undefined
    viagemId: number | undefined
    hospedagemId: number | undefined
    transporteId: number | undefined
    passeioId: number | undefined
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
    },
    hospedagemId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    transporteId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    passeioId: {
        type: DataTypes.INTEGER,
        allowNull: true
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

ViagemModel.hasMany(DespesaModel, {
    foreignKey: "viagemId",
    as: "despesas"
})

DespesaModel.belongsTo(HospedagemModel, {
    foreignKey: "hospedagemId",
    as: "hospedagens"
})

HospedagemModel.hasOne(DespesaModel, {
    foreignKey: "hospedagemId",
    as: "despesas"
})

DespesaModel.belongsTo(TransporteModel, {
    foreignKey: "transporteId",
    as: "transportes"
})

TransporteModel.hasOne(DespesaModel, {
    foreignKey: "transporteId",
    as: "despesas"
})

DespesaModel.belongsTo(PasseioModel, {
    foreignKey: "passeioId",
    as: "passeios"
})

PasseioModel.hasOne(DespesaModel, {
    foreignKey: "passeioId",
    as: "despesas"
})

export default DespesaModel;