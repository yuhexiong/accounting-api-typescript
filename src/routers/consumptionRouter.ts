import express, { NextFunction, Request, Response, Router } from 'express';
import ConsumptionController from '../controllers/consumptionController';

export default class ConsumptionRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.handleCreateConsumption);
    this.router.get('/:id', this.handleGetConsumption);
    this.router.put('/:id', this.handleUpdateConsumption);
    this.router.delete('/:id', this.handleDeleteConsumption);
  }

  async handleCreateConsumption(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        typeId,
        name,
        amount,
        note,
      } = request.body;
      response.send(await ConsumptionController.createConsumption(typeId, name, amount, note));
    } catch (error) {
      next(error)
    }
  }

  async handleGetConsumption(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) {
        throw new Error('Should provide id in path');
      }

      response.send(await ConsumptionController.getConsumption(Number(id)));
    } catch (error) {
      next(error)
    }
  }

  async handleUpdateConsumption(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) {
        throw new Error('Should provide id in path');
      }

      const {
        typeId,
        name,
        amount,
        note,
      } = request.body;
      response.send(await ConsumptionController.updateConsumption(Number(id), typeId, name, amount, note));
    } catch (error) {
      next(error)
    }
  }

  async handleDeleteConsumption(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      if (!id) {
        throw new Error('Should provide id in path');
      }

      response.send(await ConsumptionController.deleteConsumption(Number(id)));
    } catch (error) {
      next(error)
    }
  }
}