import express, { Router } from 'express';
import CronJobController from '../controllers/cronJobControllers';

const cronJobController = new CronJobController;

export default class CronJobRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', cronJobController.get);
  }
}