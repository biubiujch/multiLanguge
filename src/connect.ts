import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("multilLanguge", "root", "wwmm@xy123", {
  host: "192.168.3.8",
  dialect: "mysql",
});
