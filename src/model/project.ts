import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";
import { modelWrap } from "../utils";

@modelWrap
export class Project extends Model<{
  id: string;
  projectName: string;
  administratorID: string;
  administrator: string;
}> {
  static createItem: Function;
  static getItem: Function;
}

Project.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    administratorID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    administrator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Project",
    tableName: "project",
    timestamps: false,
  }
);
