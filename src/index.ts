import express from "express";
import { PORT } from "./constant";
import { project } from "./model/project";

const App = express();

App.use("/api/project", project);

App.listen(PORT, () => {
  console.log("server start");
});
