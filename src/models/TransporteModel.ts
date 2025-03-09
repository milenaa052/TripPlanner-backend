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
        allowNull: true
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
    hooks: {
        afterCreate: async (transporte) => {
            const despesa = await DespesaModel.create({
                tipoDespesa: "Transporte",
                gasto: transporte.gastoTransporte,
                dataDespesa: transporte.dataTransporte,
                viagemId: transporte.viagemId,
            });

            await transporte.update({ despesaId: despesa.idDespesa });
        },
    },
})

TransporteModel.belongsTo(ViagemModel, {
    foreignKey: "viagenId",
    as: "viagens"
})

ViagemModel.hasMany(TransporteModel, {
    foreignKey: "viagemId",
    as: "transportes"
})

TransporteModel.belongsTo(DespesaModel, {
    foreignKey: "despesaId",
    as: "despesas"
})

DespesaModel.hasOne(TransporteModel, {
    foreignKey: "despesaId",
    as: "transportes"
})

export default TransporteModel;