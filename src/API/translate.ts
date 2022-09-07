import { query, Router } from "express";
import { filterQuery, generateID } from "../utils/utils";
import { Translate } from "../model/translate";

const router = Router();

router.get("/getAll", async function (req, res) {
  try {
    const { projectID } = filterQuery<TranslateKeys>(req.query)
    const data = await Translate.findAll({
      where: {
        projectID
      }
    })
    res.send(data)
  } catch (e) {
    res.status(500).json("system busy")
  }
})

router.post("/create", async function (req, res) {
  try {
    const query = filterQuery<TranslateKeys>(req.query)
    const data = await Translate.findOne({ where: { key: query.key } })
    if (data !== null) {
      res.status(400).json("item exist")
      return
    }
    const result = await Translate.create({
      ...query,
      id: generateID()
    })
    res.send(result)
  } catch (e) {
    res.status(500).json("system busy")
  }
})

router.post("/delete", async function (req, res) {
  try {
    const { id } = filterQuery<TranslateKeys>(req.query)
    const data = await Translate.destroy({
      where: {
        id
      }
    })
    res.send(data)
  } catch (e) {
    res.status(500).json("system busy")
  }
})

router.post("/update", async function (req, res) {
  try {
    const { id, from, to, src, dst } = filterQuery<TranslateKeys>(req.query)
    const data = await Translate.update({
      from, to, src, dst
    }, {
      where: {
        id
      }
    })
    res.send(data)
  } catch (e) {
    res.status(500).json("system busy")
  }
})


export default router;
