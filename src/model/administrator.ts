import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Administrator extends Model<AdministratorKeys> {}

Administrator.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    tableName: "administrator",
    modelName: "Administrator",
    timestamps: false,
  }
);
