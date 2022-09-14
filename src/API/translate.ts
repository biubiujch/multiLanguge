import { query, Router } from "express";
import { filterQuery, generateID } from "../utils/utils";
import { Source } from "../model/source";
import { Target } from "../model/target";
import { Project } from "../model/project";
import path from "path"
import fs from "fs"
import { groupBy } from "lodash"

const router = Router();

router.get("/getAll", async function (req, res, next) {
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
  } catch (e) { next(e) }
});

router.post("/create", async function (req, res, next) {
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
        key
      });
    }
    res.send(result);
  } catch (e) { next(e) }
});

router.post("/delete", async function (req, res, next) {
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
  } catch (e) { next(e) }
});

router.post("/update", async function (req, res, next) {
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
  } catch (e) { next(e) }
})

router.get("/deployment", async function (req, res, next) {
  try {
    fs.readdir(path.resolve(__dirname, "../../file"), (err) => {
      if (err) {
        fs.mkdir(path.resolve(__dirname, "../../file"), () => { })
      }
    })
    const { projectID } = filterQuery<{ projectID: string }>(req.query)
    const target = await Target.findAll({
      where: {
        projectID
      }
    })
    const group = groupBy(target.map((t) => t.get()), "key")
    const data: Record<string, any> = {}
    Object.keys(group).forEach((key) => {
      data[key] = group[key].reduce((r, t) => ({ ...r, [t.to]: t.text }), {})
    })
    fs.writeFile(path.resolve(__dirname, `../../file/${projectID}.json`), `${JSON.stringify(data)}`, "utf-8", () => {
      res.send(path.resolve(__dirname, `../../file/${projectID}.json`))
    })
  } catch (e) { next(e) }
})

export default router;
