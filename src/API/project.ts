import express from "express";
import { Project } from "../model/project";
import { generateID } from "../utils";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const { projectName, administrator, administratorID } = req.query as any;
  await Project.create({
    id: generateID(),
    projectName,
    administrator,
    administratorID,
  });
  res.send("create success");
});

router.post("/delete", async (req, res, next) => {
  const { id } = req.query as any;
  await Project.destroy({
    where: {
      id,
    },
  });
  res.send("delete succes");
});

router.get("/getAll", async (req, res) => {
  const data = await Project.findAll();
  res.send(data);
});

export default router;
