import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connect";

export class Translate extends Model<TranslateKeys> {
}

Translate.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    projectID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    srcText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dstText: {
      type: DataTypes.STRING,
      allowNull: false
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false
    }, from: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "Translate",
    tableName: "translate",
    timestamps: false,
  }
);
