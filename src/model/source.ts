import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Source extends Model<SourceKeys> {
}

Source.init({
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
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: "Source",
  tableName: "source",
  timestamps: false,
})