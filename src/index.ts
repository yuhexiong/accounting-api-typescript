import cors from 'cors';
import * as dotenv from "dotenv";
import express, { Express } from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { AppDataSource } from "../dataSource";
import { cronJobList, executeCronJobs } from "../executeCronJob";
import swaggerOption from "./config/swagger";
import CronJob from "./entity/cronJob";
import Type from "./entity/type";
import { responseHandler } from "./middlewares/errorHandling";
import ConsumptionRouter from './routers/consumptionRouter';
import ReportRouter from "./routers/reportRouter";
import TypeRouter from "./routers/typeRouter";

dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT ?? 7777;
const app: Express = express();
app.use(express.json());
expressJSDocSwagger(app)(swaggerOption);

app.use(cors());

const consumptionRouter = new ConsumptionRouter;
const typeRouter = new TypeRouter;
const reportRouter = new ReportRouter;

app.use('/consumption', consumptionRouter.router);
app.use('/type', typeRouter.router);
app.use('/report', reportRouter.router);

app.use(responseHandler);

async function main() {
  await AppDataSource.initialize();
  if (process.env.INSERT_CHINESE_DATA === 'true') {
    await insertData(true);
  } else if (process.env.INSERT_ENGLISH_DATA === 'true') {
    await insertData(false);
  }

  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });

  await executeCronJobs();
}

async function insertData(isChinese?: boolean) {
  const typeFood = new Type();
  typeFood.id = 'FOOD';
  typeFood.name = isChinese ? '食物' : 'FOOD';
  await AppDataSource.manager.save(typeFood);

  const typeShopping = new Type();
  typeShopping.id = 'SHOPPING';
  typeShopping.name = isChinese ? '購物' : 'SHOPPING';
  await AppDataSource.manager.save(typeShopping);

  const typeEntertainment = new Type();
  typeEntertainment.id = 'ENTERTAINMENT';
  typeEntertainment.name = isChinese ? '娛樂' : 'ENTERTAINMENT';
  await AppDataSource.manager.save(typeEntertainment);

  const typeExercise = new Type();
  typeExercise.id = 'EXERCISE';
  typeExercise.name = isChinese ? '運動' : 'EXERCISE';
  await AppDataSource.manager.save(typeExercise);

  const typeTransportation = new Type();
  typeTransportation.id = 'TRANSPORTATION';
  typeTransportation.name = isChinese ? '交通費' : 'TRANSPORTATION';
  await AppDataSource.manager.save(typeTransportation);

  const typeUtility = new Type();
  typeUtility.id = 'UTILITY';
  typeUtility.name = isChinese ? '水電費' : 'TRANSPORTATION';
  await AppDataSource.manager.save(typeUtility);

  const typeOther = new Type();
  typeOther.id = 'OTHER';
  typeOther.name = isChinese ? '其他' : 'OTHER';
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