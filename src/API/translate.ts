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
        ...query,
      },
    });
    res.send();
  });
});

router.post("/add", function (req, res) {
  reqWrapper(req, res, async () => {
    const query = filterQuery<SourceKeys>(req.query);
    await Source.create({
      ...query,
      id: generateID(),
    });
    res.send("add success");
  });
});

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
