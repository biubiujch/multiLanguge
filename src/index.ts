import express from "express";
import project from "./API/project";
import { PORT } from "./constant";

const App = express();
App.all("*",(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  next()
})

App.use("/api/project", project);

App.get("/", (req, res) => {
  res.send("ok");
});

App.listen(PORT, () => {
  console.log("server start on port " + PORT);
});
