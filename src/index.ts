import express from "express";
import projectRouter from "./API/project";
import { PORT } from "./constant";

const App = express();

App.use("/api/project", projectRouter);

App.listen(PORT, () => {
  console.log("server start");
});
