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

  /**
   * @typedef { object } createType
   * @property { string } id.required - 類別id
   * @property { string } name.required - 類別名稱
   */

  /**
   * POST /type
   * @summary 新增一項類別
   * @tags type 類別
   * @param { createType } request.body
   * @return { object } 200 - success - application/json
   */
  async handleCreateType(request: Request, response: Response, next: NextFunction) {
    try {
      const { id, name } = request.body;
      response.send(await TypeController.createType(id, name));
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /type/{id}
   * @summary 取得一項類別
   * @tags type 類別
   * @param { string } id.param - 類別id
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *     "id": "FOOD",
   *     "status": 0,
   *     "name": "食物"
   * }
   */
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

  /**
   * PATCH /type/{id}/{name}
   * @summary 更新一項類別名稱
   * @tags type 類別
   * @param { string } id.param - 類別id
   * @param { string } name.param - 類別名稱
   * @return { object } 200 - success - application/json
   */
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

  /**
   * DELETE /type/{id}
   * @summary 刪除一項類別
   * @tags type 類別
   * @param { string } id.param - 類別id
   * @return { object } 200 - success - application/json
   */
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