import * as dotenv from "dotenv";
import express, { Express } from 'express';
import { AppDataSource } from "../data-source";
import { executeCronJobs } from "../executeCronJob";
import CronJobRouter from './routes/cronJobRouter';

dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT ?? 8080;
const app: Express = express();
app.use(express.json());

const cronJobRouter = new CronJobRouter;
app.use('', cronJobRouter.router);

async function main() {
  await AppDataSource.initialize();

  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });

  await executeCronJobs();
}

main();