import express from 'express';

export const responseHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(400);
  res.json(err);
}