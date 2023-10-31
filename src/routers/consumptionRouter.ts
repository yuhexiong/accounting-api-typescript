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
    this.router.get('/', this.handleGetAllConsumptions);
    this.router.get('/:id', this.handleGetConsumption);
    this.router.put('/:id', this.handleUpdateConsumption);
    this.router.delete('/:id', this.handleDeleteConsumption);
  }

  /**
   * @typedef { object } createConsumption
   * @property { string } typeId - 類別id, 預設OTHER
   * @property { string } name - 消費名稱
   * @property { number } amount - 金額, 預設0
   * @property { string } note - 註記
   */

  /**
   * POST /consumption
   * @summary 新增一筆消費
   * @tags consumption 消費
   * @param { createConsumption } request.body
   * @return { object } 200 - success - application/json
   */
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

  /**
   * GET /consumption
   * @summary 取得所有消費
   * @tags consumption 消費
   * @param { number } year.query - 年
   * @param { number } month.query - 月份
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   *[
   *  {
   *    "id": 1,
   *    "date": "2023-09-21",
   *    "status": 0,
   *    "typeId": "FOOD",
   *    "name": "韓式泡菜",
   *    "amount": 150,
   *    "note": "好吃"
   *  },
   *  {
   *    "id": 2,
   *    "date": "2023-09-29",
   *    "status": 0,
   *    "typeId": "FOOD",
   *    "name": "泡麵",
   *    "amount": 500,
   *    "note": "還好"
   *  }
   *]
   */
  async handleGetAllConsumptions(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        year,
        month,
      } = request.query;

      response.send(await ConsumptionController.getAllConsumptions(Number(year), Number(month)));
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /consumption/{id}
   * @summary 取得一筆消費
   * @tags consumption 消費
   * @param { number } id.param.required - 消費id
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *     "id": 1,
   *     "date": "2023-09-21",
   *     "status": 0,
   *     "typeId": "FOOD",
   *     "name": "韓式泡菜",
   *     "amount": 150,
   *     "note": "巷口那家"
   * }
   */
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

  /**
   * @typedef { object } updateConsumption
   * @property { string } typeId - 類別id
   * @property { string } name - 消費名稱
   * @property { number } amount - 金額
   * @property { string } note - 註記
   */

  /**
   * PUT /consumption/{id}
   * @summary 更新一筆消費
   * @tags consumption 消費
   * @param { number } id.param.required - 消費id
   * @param { updateConsumption } request.body
   * @return { object } 200 - success - application/json
   */
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

  /**
   * DELETE /consumption/{id}
   * @summary 刪除一筆消費
   * @tags consumption 消費
   * @param { number } id.param.required - 消費id
   * @return { object } 200 - success - application/json
   */
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