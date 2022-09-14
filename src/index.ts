import express from "express";
import project from "./API/project";
import administrator from "./API/administrator";
import translate from "./API/translate";
import "./utils/parseENV";
import parser from "body-parser";
import { expressjwt } from "express-jwt";
import { handleAuth } from "./utils/auth";

const App = express();
App.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

App.use(
  expressjwt({
    secret: process.env.SECRET_KEY!,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/administrator/login", "/api/administrator/regist"],
  })
);
App.use(handleAuth);
App.use(parser.json());
App.use("/api/project", project);
App.use("/api/administrator", administrator);
App.use("/api/translate", translate);

App.listen(process.env.SERVER_PORT, () => {
  console.log("server start on port " + process.env.SERVER_PORT);
});
