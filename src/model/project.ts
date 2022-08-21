import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Project extends Model<{
  id: number;
  projectName: string;
  administrator: string;
}> {}
Project.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    projectName: {
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
