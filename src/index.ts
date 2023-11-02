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

const port = process.env.PORT ?? 7777;
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
  const typeFood = new Type();
  typeFood.id = 'FOOD';
  typeFood.name = '食物';
  await AppDataSource.manager.save(typeFood);

  const typeShopping = new Type();
  typeShopping.id = 'SHOPPING';
  typeShopping.name = '購物';
  await AppDataSource.manager.save(typeShopping);

  const typeEntertainment = new Type();
  typeEntertainment.id = 'ENTERTAINMENT';
  typeEntertainment.name = '娛樂';
  await AppDataSource.manager.save(typeEntertainment);

  const typeExercise = new Type();
  typeExercise.id = 'EXERCISE';
  typeExercise.name = '運動';
  await AppDataSource.manager.save(typeExercise);

  const typeTransportation = new Type();
  typeTransportation.id = 'TRANSPORTATION';
  typeTransportation.name = '交通費';
  await AppDataSource.manager.save(typeTransportation);

  const typeUtility = new Type();
  typeUtility.id = 'UTILITY';
  typeUtility.name = '水電費';
  await AppDataSource.manager.save(typeUtility);

  const typeOther = new Type();
  typeOther.id = 'OTHER';
  typeOther.name = '其他';
  await AppDataSource.manager.save(typeOther);

  const cronJob = new CronJob();
  cronJob.name = cronJobList.MONTHLY_REPORT;
  cronJob.seconds = '0';
  cronJob.minutes = '0';
  cronJob.hours = '0';
  cronJob.day = '1';
  await AppDataSource.manager.save(cronJob);
}

main();