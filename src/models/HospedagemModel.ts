import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import DespesaModel from "../models/DespesaModel";
import ViagemModel from "./ViagemModel";

class HospedagemModel extends Model {
    idHospedagem: number | undefined
    localHospedagem: string | undefined
    dataCheckin: Date | undefined
    dataCheckout: Date | undefined
    gastoTotal: number | undefined
    despesaId: number | undefined
    viagemId: number | undefined
}

HospedagemModel.init({
    idHospedagem: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    localHospedagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCheckin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataCheckout: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gastoTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    despesaId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    viagemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: "HospedagemModel",
    tableName: "hospedagens",
    hooks: {
        afterCreate: async (hospedagem) => {
            const despesa = await DespesaModel.create({
                tipoDespesa: "Hospedagem",
                gasto: hospedagem.gastoTotal,
                dataDespesa: hospedagem.dataCheckout,
                viagemId: hospedagem.viagemId,
            });

            await hospedagem.update({ despesaId: despesa.idDespesa });
        },
    },
})

HospedagemModel.belongsTo(ViagemModel, {
    foreignKey: "viagemId",
    as: "viagens"
})

ViagemModel.hasMany(HospedagemModel, {
    foreignKey: "viagemId",
    as: "hospedagens"
});

HospedagemModel.belongsTo(DespesaModel, {
    foreignKey: "despesaId",
    as: "despesas",
});

DespesaModel.hasOne(HospedagemModel, {
    foreignKey: "despesaId",
    as: "hospedagens",
});


export default HospedagemModel;