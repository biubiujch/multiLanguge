import express from "express";
import project from "./API/project";
import { PORT } from "./constant";

const App = express();

App.use("/api/project", project);

App.get("/", (req, res) => {
  res.send("ok");
});

App.listen(PORT, () => {
  console.log("server start on port " + PORT);
});
