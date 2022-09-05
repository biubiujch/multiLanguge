import { Router } from "express"
import { Translate } from "../model/translate"
import { generateID } from "../utils"

const router = Router()

router.get(
  "/getAll", async function (req, res) {
    try {
      const { projectID } = req.query as any
      const data = await Translate.findAll({ where: { projectID } })
      res.send(data)
    } catch (e) {
      res.status(400).json("getall fail")
    }
  }
)

router.post("/add", async function (req, res) {
  try {
    const { projectID, srcText, dstText, to, from } = req.query as any
    if (!projectID || !srcText || !dstText || !to || !from) throw new Error()
    await Translate.create({
      id: generateID(),
      projectID,
      srcText,
      dstText,
      to,
      from
    })
    res.send("add success")
  } catch (e) {
    res.status(400).json("add fail")
  }
})


router.post("/delete", async function (req, res) {
  try {
    const { id } = req.query as any
    if (!id) throw new Error()
    await Translate.destroy({
      where: {
        id
      }
    })
    res.send("delete success")
  } catch (e) {
    res.status(400).json("delete fail")
  }
})
export default router