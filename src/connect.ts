import { Sequelize } from "sequelize";
import "./utils/parseENV"

export const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.HOST,
  dialect: "mysql",
});


