import express from "express";
import { Project } from "../model/project";
import { generateID } from "../utils/utils";
import { InfoLogger } from "../utils/logger";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const { projectName, administrator, administratorID } = req.query as any;
  try {
    if (!projectName || !administrator || !administratorID) {
      throw new Error();
    }
    await Project.create({
      id: generateID(),
      projectName,
      administrator,
      administratorID,
    });
    res.send("create success");
  } catch (e) {
    res.status(400).json("create fail");
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const { id } = req.query as any;
    await Project.destroy({
      where: {
        id,
      },
    });
    res.send("delete succes");
  } catch (e) {
    res.status(400).json("delete fail");
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const { id, projectName } = req.query as any;
    if (!id || !projectName) {
      throw new Error();
    }
    await Project.update(
      { projectName: projectName },
      {
        where: {
          id,
        },
      }
    );
    res.send("update success");
  } catch (e) {
    res.status(400).json("update fail");
  }
});

router.get("/getAll", async (req, res) => {
  const data = await Project.findAll();
  InfoLogger.log("info", "getdata");
  res.send(data);
});

export default router;
