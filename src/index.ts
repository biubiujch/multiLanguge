import express from "express";
import project from "./API/project";
import administrator from "./API/administrator";
import translate from "./API/translate"
import { PORT } from "./constant";
import "./utils/parseENV"

console.log(process.env.HOST)

const App = express();
App.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

App.use("/api/project", project);
App.use("/api/administrator", administrator);
App.use("/api/translate", translate);

App.get("/", (req, res) => {
  res.send("ok");
});

App.listen(PORT, () => {
  console.log("server start on port " + PORT);
});
