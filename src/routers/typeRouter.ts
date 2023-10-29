import express, { NextFunction, Request, Response, Router } from 'express';
import TypeController from '../controllers/typeController';

export default class TypeRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.handleCreateType);
    this.router.get('/:id', this.handleGetType);
    this.router.patch('/:id/:name', this.handleUpdateType);
    this.router.delete('/:id', this.handleDeleteType);
  }

  async handleCreateType(request: Request, response: Response, next: NextFunction) {
    try {
      const { id, name } = request.body;
      response.send(await TypeController.createType(id, name));
    } catch (error) {
      next(error)
    }
  }

  async handleGetType(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) {
        throw new Error('Should provide id in path');
      }

      response.send(await TypeController.getType(id));
    } catch (error) {
      next(error)
    }
  }

  async handleUpdateType(request: Request, response: Response, next: NextFunction) {
    try {
      const { id, name } = request.params;

      if (!id) {
        throw new Error('Should provide id in path');
      }

      if (!name) {
        throw new Error('Should provide id in path');
      }

      response.send(await TypeController.updateType(id, name));
    } catch (error) {
      next(error)
    }
  }

  async handleDeleteType(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) {
        throw new Error('Should provide id in path');
      }

      response.send(await TypeController.deleteType(id));
    } catch (error) {
      next(error)
    }
  }
}