import express from "express";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../connect";
const router = express.Router();
let id = 1;

export class Project extends Model<{ id: number; projectName: string; administrator: string }> { }
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

const create = async (cb: Function, params: { id: number; projectName: string; administrator: string }) => {
  await Project.create(params);
  cb();
};

const fetch = async (cb: Function) => {
  let result = await Project.findAll();
  cb(result);
};

router.post("/create", (req, res, next) => {
  const { projectName, administrator }: { projectName: string; administrator: string } = req.query as any;
  create(() => res.send("create success"), { id: id++, projectName, administrator });
});
router.get("/get", (req, res, next) => {
  fetch((data: any) => {
    res.send(data);
  });
});

export default router

