import { DataTypes, Model } from "sequelize"
import { sequelize } from "../connect"

export class Target extends Model<Targetkeys>{ }

Target.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  projectID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  srcID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "target",
  modelName: "target",
  timestamps: false
})