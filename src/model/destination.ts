import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Destiantion extends Model<DestinationKeys> { }

Destiantion.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    srcID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectID: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Destiantion",
    tableName: "destiantion",
    timestamps: false,
  }
);
