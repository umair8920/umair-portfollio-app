// server/db/index.ts
import { Sequelize } from "sequelize";
import dbConfig from "./config";

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.username as string,
  dbConfig.password as string,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "postgres",
    logging: false, // set true for SQL logs
  }
);

export default sequelize;
