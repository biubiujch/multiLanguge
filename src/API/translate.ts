import { query, Router } from "express";
import { filterQuery, generateID } from "../utils/utils";
import { Source } from "../model/source";
import { Target } from "../model/target";

const router = Router();


router.get("/getAll", async function (req, res) {
  try {
    const { projectID } = filterQuery<SourceKeys & Targetkeys>(req.query)
    const data = await Source.findAll({
      where: {
        projectID
      }
    })
    console.log(data[0].get())
    const dstData = await Target.findAll({
      where: {
        projectID
      }
    })
    const result: { dst: Target[]; id: string; projectID: String; key: string; text: string; from: string; }[] = []
    data.forEach((item) => {
      const value = item.get()
      const dst = dstData.filter((e) => e.get().srcID === value.id)
      result.push({
        ...value,
        dst
      })
    })
    res.send(result)
  } catch (e) {
    console.log(e)
    res.status(500).json("system busy")
  }
})

router.post("/create", async function (req, res) {
  try {
    const query = filterQuery<SourceKeys & { dst: { to: string, text: string }[] }>(req.query)
    const data = await Source.findOne({ where: { key: query.key } })
    if (data !== null) {
      res.status(400).json("item exist")
      return
    }
    const result = await Source.create({
      ...query,
      id: generateID()
    })
    for await (const item of query.dst) {
      await Target.create({
        id: generateID(),
        projectID: query.projectID,
        srcID: result.get().id,
        text: item.text,
        to: item.to
      })
    }
    res.send(result)
  } catch (e) {
    res.status(500).json("system busy")
  }
})

router.post("/delete", async function (req, res) {
  try {
    const { id } = filterQuery<SourceKeys>(req.query)
    const data = await Source.destroy({
      where: {
        id
      }
    })
    await Target.destroy({
      where: {
        srcID: id
      }
    })
    res.send(data)
  } catch (e) {
    res.status(500).json("system busy")
  }
})



export default router;
