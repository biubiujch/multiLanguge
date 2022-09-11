import express from "express";
import project from "./API/project";
import administrator from "./API/administrator";
import translate from "./API/translate";
import "./utils/parseENV";
import parser from "body-parser";

const App = express();
App.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

App.use(parser.json());
App.use("/api/project", project);
App.use("/api/administrator", administrator);
App.use("/api/translate", translate);

App.get("/", (req, res) => {
  res.send("ok");
});

App.listen(process.env.SERVER_PORT, () => {
  console.log("server start on port " + process.env.SERVER_PORT);
});
