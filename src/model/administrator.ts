import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Administrator extends Model<AdministratorKeys> {}

Administrator.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    administratorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passWord: {
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
