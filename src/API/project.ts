import express from "express";
import { Project } from "../model/project";
import { filterQuery, generateID } from "../utils/utils";
import { InfoLogger } from "../utils/logger";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  try {
    const query = filterQuery<ProjectKeys>(req.query);
    await Project.create({
      ...query,
      id: generateID(),
    });
    res.send("create success");
  } catch (e) {
    console.log(e);
    res.status(500).json("system busy");
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const { id } = filterQuery<ProjectKeys>(req.query);
    await Project.destroy({
      where: {
        id,
      },
    });
    res.send("delete succes");
  } catch (e) {
    res.status(500).json("system busy");
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const { id, projectName } = filterQuery<ProjectKeys>(req.query);
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
    res.status(500).json("system busy");
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await Project.findAll();
    res.send(data);
  } catch (e) {
    res.status(500).json("system busy");
  }
});

router.get("/detail", async function (req, res) {
  try {
    const { id } = filterQuery<ProjectKeys>(req.query);
    const data = await Project.findOne({
      where: {
        id,
      },
    });
    res.send(data);
  } catch (e) {
    res.status(500).json("system busy");
  }
});

export default router;
