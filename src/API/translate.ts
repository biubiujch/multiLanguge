import { Router } from "express";
import { filterQuery, generateID, reqWrapper } from "../utils/utils";
import { Source } from "../model/source";
import { Destiantion } from "../model/destination";

const router = Router();

router.get("/getAll", function (req, res) {
  reqWrapper(req, res, async () => {
    const query = filterQuery<SourceKeys>(req.query);
    const data = await Source.findAll({
      where: {
        projectID: query.projectID
      },
    });
    const dstData = await Destiantion.findAll({
      where: {
        to: query.to,
        projectID: query.projectID
      },
    })
    res.send(dstData);
  });
});

router.post("/add", function (req, res) {
  reqWrapper(req, res, async () => {
    const query = filterQuery<SourceKeys>(req.query);
    const id = generateID()
    const data = await Source.create({
      ...query,
      id,
    });
    res.send(data);
  });
});

router.post("/addDst", function (req, res) {
  reqWrapper(req, res, async () => {
    const query = filterQuery<DestinationKeys>(req.query);
    const id = generateID()
    const data = await Destiantion.create({
      ...query,
      id,
    });
    res.send(data);
  });
});

router.post("/delete", function (req, res) {
  reqWrapper(req, res, async function () {
    const query = filterQuery<SourceKeys>(req.query)
    await Source.destroy({
      where: {
        ...query
      }
    })
    res.send("success")
  })
})

router.post("/addDst", function (req, res) {
  reqWrapper(req, res, async () => {
    const query = filterQuery<DestinationKeys>(req.query);
    await Destiantion.create({
      ...query,
      id: generateID(),
    });
  });
  res.send("add success");
});



export default router;
