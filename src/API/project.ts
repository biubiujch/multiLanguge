import express from "express";
import { Project } from "../model/project";
import { generateID } from "../utils";

const router = express.Router();

const create = async (
  cb: Function,
  params: { id: number; projectName: string; administrator: string }
) => {
  await Project.create(params);
  cb();
};

const fetch = async (cb: Function) => {
  let result = await Project.findAll();
  cb(result);
};

router.post("/create", (req, res, next) => {
  const {
    projectName,
    administrator,
  }: { projectName: string; administrator: string } = req.query as any;
  create(() => res.send("create success"), {
    id: generateID(),
    projectName,
    administrator,
  });
});
router.get("/get", (req, res, next) => {
  fetch((data: any) => {
    res.send(data);
  });
});

export default router;
