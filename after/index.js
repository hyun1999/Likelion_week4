import express from "express";
import api from "./api";
import cors from "cors";

const app = express();
const port = 3000;

const { sequelize } = require("../models");

const corsOptions = {
  origin : "http://localhost:3001/api/posts"
}

app.use(cors(corsOptions))


sequelize
  .sync({ force: false }) 
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api", api);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});