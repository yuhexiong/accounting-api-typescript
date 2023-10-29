import * as dotenv from "dotenv";
import express, { Express } from 'express';
import { AppDataSource } from "../dataSource";
import { cronJobList, executeCronJobs } from "../executeCronJob";
import ConsumptionRouter from './routers/consumptionRouter';
import TypeRouter from "./routers/typeRouter";
import Type from "./entity/type";
import CronJob from "./entity/cronJob";
import swaggerOption from "./config/swagger";
import expressJSDocSwagger from 'express-jsdoc-swagger';
import ReportRouter from "./routers/reportRouter";

dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT ?? 8080;
const app: Express = express();
app.use(express.json());
expressJSDocSwagger(app)(swaggerOption);

const consumptionRouter = new ConsumptionRouter;
const typeRouter = new TypeRouter;
const reportRouter = new ReportRouter;

app.use('/consumption', consumptionRouter.router);
app.use('/type', typeRouter.router);
app.use('/report', reportRouter.router);

async function main() {
  await AppDataSource.initialize();
  if (process.env.INSERT_DATA === 'true') {
    await insertData();
  }

  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });

  await executeCronJobs();
}

async function insertData() {
  const type = new Type();
  type.id = 'OTHER';
  type.name = '其他';
  await AppDataSource.manager.save(type);

  const cronJob = new CronJob();
  cronJob.name = cronJobList.MONTHLY_REPORT;
  cronJob.seconds = '0';
  cronJob.minutes = '0';
  cronJob.hours = '0';
  cronJob.day = '1';
  await AppDataSource.manager.save(cronJob);
}

main();