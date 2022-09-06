import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connect";

export class Source extends Model<SourceKeys> {
}

Source.init(
  {
    id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Source",
    tableName: "source",
    timestamps: false,
  }
);
