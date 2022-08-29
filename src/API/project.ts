import express from "express";
import { Project } from "../model/project";
import { generateID } from "../utils";

const router = express.Router();

router.post("/create", (req, res, next) => {
  const { projectName, administrator }: { projectName: string; administrator: string } = req.query as any;
  Project.createItem(() => res.send("create success"), {
    id: generateID(),
    projectName,
    administrator,
  });
});

router.get("/get", (req, res, next) => {
  Project.getItem((data: any) => {
    res.send(data);
  });
});

export default router;
