import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import ViagemModel from "./ViagemModel";

class HospedagemModel extends Model {
    idHospedagem: number | undefined
    localHospedagem: string | undefined
    dataCheckin: Date | undefined
    dataCheckout: Date | undefined
    gastoTotal: number | undefined
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
    viagemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: "HospedagemModel",
    tableName: "hospedagens",
})

HospedagemModel.belongsTo(ViagemModel, {
    foreignKey: "viagemId",
    as: "viagens"
})

ViagemModel.hasMany(HospedagemModel, {
    foreignKey: "viagemId",
    as: "hospedagens"
});

export default HospedagemModel;