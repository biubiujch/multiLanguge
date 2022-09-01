import { Router } from "express";
import { Administrator } from "../model/administrator";

const router = Router();

router.post("/login", async function (req, res, next) {
  const { name, password } = req.query as Record<string, any>;

  const user = await Administrator.findOne({
    where: {
      name,
    },
  });
  if (!user) {
    res.status(202).json({ message: "count not exsit" });
  }
  if (user?.getDataValue("password") === password) {
    res.send(user);
  } else {
    res.status(201).json({ message: "password error" });
  }
});

export default router;
