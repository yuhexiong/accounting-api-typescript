import express from 'express';
import { MyError, myErrorMessage } from '../utils/errorMessage';

export const responseHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(400);
  res.json(myErrorMessage(new MyError(err)));
}