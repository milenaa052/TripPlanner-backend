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
        allowNull: true
    },
    viagemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "PasseioModel",
    tableName: "passeios",
    hooks: {
        afterCreate: async (passeio) => {
            const despesa = await DespesaModel.create({
                tipoDespesa: "Passeio",
                gasto: passeio.gastoPasseio,
                dataDespesa: passeio.dataPasseio,
                viagemId: passeio.viagemId,
            });

            await passeio.update({ despesaId: despesa.idDespesa });
        },
    },
})

PasseioModel.belongsTo(ViagemModel, {
    foreignKey: "viagemId",
    as: "viagens"
})

ViagemModel.hasMany(PasseioModel, {
    foreignKey: "viagemId",
    as: "passeios"
})

PasseioModel.belongsTo(DespesaModel, {
    foreignKey: "despesaId",
    as: "despesas"
})

DespesaModel.hasOne(PasseioModel, {
    foreignKey: "despesaId",
    as: "passeios"
})

export default PasseioModel;