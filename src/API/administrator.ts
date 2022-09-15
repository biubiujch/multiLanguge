import { Router } from "express";
import { Administrator } from "../model/administrator";
import { filterQuery, generateID } from "../utils/utils";
import { setToken } from "../utils/auth";

const router = Router();

router.post("/login", async function (req, res, next) {
  try {
    const { name, password } = req.query as Record<string, any>;
    const user = await Administrator.findOne({
      where: {
        name,
      },
    });
    if (!user) {
      res.status(202).json({ message: "count not exsit" });
    } else if (user?.getDataValue("password") === password) {
      res.send({
        id: user.getDataValue("id"),
        username: user.getDataValue("name"),
        token: setToken({ name: user.getDataValue("name"), id: user.getDataValue("id") }),
      });
    } else {
      res.status(201).json({ message: "password error" });
    }
  } catch (e) { next(e) }
});

router.post("/logout", async function (req, res, next) {
  try {
  } catch (e) { next(e) }
});

router.post("/regist", async function (req, res, next) {
  try {
    const { name, password } = filterQuery<AdministratorKeys>(req.body);
    const data = await Administrator.create({
      name,
      password,
      id: generateID(),
    });
    res.send(data);
  } catch (e) { next(e) }
});

router.post("/changepsw", async function (req, res, next) {
  try {
    const { id, password } = filterQuery<AdministratorKeys>(req.body)
    await Administrator.update({ password }, {
      where: {
        id
      }
    })
    res.send("change success")
  } catch (e) {
    next(e)
  }
})

export default router;
