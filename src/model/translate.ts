import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Translate extends Model<TranslateKeys> {
}

Translate.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  projectID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dst: {
    type: DataTypes.STRING,
    allowNull: false
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Translate",
  tableName: "translate",
  timestamps: false,
})