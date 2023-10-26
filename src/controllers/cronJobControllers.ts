import { NextFunction, Request, Response } from 'express';

export default class CronJobController {
  get(request: Request, response: Response, next: NextFunction) {
    response.send('hi');
  }
}