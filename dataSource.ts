import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import CronJob from "./src/entity/cronJob"
import Consumption from "./src/entity/consumption"
import Type from "./src/entity/type"
import Report from "./src/entity/report"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || "127.0.0.1",
  port: (process.env.DB_PORT as unknown) as number || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "accounting",
  bigNumberStrings: false,
  synchronize: false,
  logging: true,
  entities: [CronJob, Consumption, Type, Report],
  migrations: [`src/migrations/*.{ts,js}`],
  subscribers: [],
})
