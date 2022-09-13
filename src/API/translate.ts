import { query, Router } from "express";
import { filterQuery, generateID } from "../utils/utils";
import { Source } from "../model/source";
import { Target } from "../model/target";
import { Project } from "../model/project";

const router = Router();

router.get("/getAll", async function (req, res) {
  try {
    const { projectID } = filterQuery<SourceKeys & Targetkeys>(req.query);
    const data = await Source.findAll({
      where: {
        projectID,
      },
    });
    const dstData = await Target.findAll({
      where: {
        projectID,
      },
    });
    const result: { dst: Target[]; id: string; projectID: String; key: string; text: string; from: string }[] = [];
    data.forEach((item) => {
      const value = item.get();
      const dst = dstData.filter((e) => e.get().srcID === value.id);
      result.push({
        ...value,
        dst,
      });
    });
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).json("system busy");
  }
});

router.post("/create", async function (req, res) {
  try {
    const { projectID, from, text, key, dst } = filterQuery<SourceKeys & { dst: { to: string; text: string }[] }>(
      req.body
    );
    const data = await Source.findOne({ where: { projectID, key } });
    if (data !== null) {
      res.status(400).json("item exist");
      return;
    }

    const result = await Source.create({
      id: generateID(),
      projectID,
      from,
      text,
      key,
    });
    await Project.update({ state: 1 }, { where: { id: projectID } });
    for await (const item of dst) {
      await Target.create({
        id: generateID(),
        projectID: projectID,
        srcID: result.get().id,
        text: item.text,
        to: item.to,
      });
    }
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).json("system busy");
  }
});

router.post("/delete", async function (req, res) {
  try {
    const { id } = filterQuery<SourceKeys>(req.query);
    await Source.destroy({
      where: {
        id,
      },
    });

    await Target.destroy({
      where: {
        srcID: id,
      },
    });
    res.send("delete success");
  } catch (e) {
    console.log(e)
    res.status(500).json("system busy");
  }
});

router.post("/update", async function (req, res) {
  try {
    const { text, dst, id } = filterQuery<SourceKeys & { dst: { text: string, id: string }[] }>(
      req.body
    );
    await Source.update({ text }, { where: { id } })
    for await (let item of dst) {
      await Target.update({
        text: item.text
      }, {
        where: {
          id: item.id
        }
      })
    }
    res.send("update success")
  } catch (e) {
    console.log(e)
    res.status(500).json("system busy")
  }
})

export default router;
