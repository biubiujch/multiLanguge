import { Sequelize } from "sequelize";
import * as dotenv from "dotenv"
dotenv.config()

export const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
  host: process.env.HOST,
  dialect: "mysql",
});


