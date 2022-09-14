import express from "express";
import { Project } from "../model/project";
import { filterQuery, generateID } from "../utils/utils";
import { Target } from "../model/target";
import { Source } from "../model/source";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  try {
    const query = filterQuery<ProjectKeys>(req.query);
    await Project.create({
      ...query,
      state: 0,
      id: generateID(),
    });
    res.send("create success");
  } catch (e) { next(e) }
});

router.post("/delete", async (req, res, next) => {
  try {
    const { id } = filterQuery<ProjectKeys>(req.query);
    await Project.destroy({
      where: {
        id,
      },
    });
    await Source.destroy({
      where: {
        projectID: id,
      },
    });
    await Target.destroy({
      where: {
        projectID: id,
      },
    });
    res.send("delete succes");
  } catch (e) { next(e) }
});

router.post("/update", async (req, res, next) => {
  try {
    const { id, projectName, srcLang, dstLang } = filterQuery<ProjectKeys>(req.query);
    await Project.update(
      { projectName, srcLang, dstLang },
      {
        where: {
          id,
        },
      }
    );
    res.send("update success");
  } catch (e) { next(e) }
});

router.get("/getAll", async (req, res, next) => {
  try {
    const data = await Project.findAll();
    res.send(data);
  } catch (e) { next(e) }
});

router.get("/detail", async function (req, res, next) {
  try {
    const { id } = filterQuery<ProjectKeys>(req.query);
    const data = await Project.findOne({
      where: {
        id,
      },
    });
    res.send(data);
  } catch (e) { next(e) }
});

export default router;
