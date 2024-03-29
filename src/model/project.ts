import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Project extends Model<ProjectKeys> {}

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
    srcLang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dstLang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.NUMBER,
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
