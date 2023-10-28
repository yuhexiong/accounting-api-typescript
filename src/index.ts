import { AppDataSource } from "../data-source"
import express, { Express } from 'express';
import CronJobRouter from './routes/cronJobRouter';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });

export async function initDB() {
  await AppDataSource.initialize();
}

const port = process.env.PORT || 8080;
const app: Express = express();
app.use(express.json());

const cronJobRouter = new CronJobRouter;
app.use('', cronJobRouter.router);

async function start() {
  await initDB();
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
}

start();

export default app;