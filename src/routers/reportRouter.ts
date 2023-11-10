import express, { NextFunction, Request, Response, Router } from 'express';
import ReportController from '../controllers/reportController';

export default class ReportRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/:year/:month', this.handleCreateReport);
    this.router.get('/:year/:month', this.handleGetReport);
  }

  /**
   * POST /report/{year}/{month}
   * @summary 產生指定年月報表
   * @tags report 報表
   * @param { number } year.param.required - 年
   * @param { number } month.param.required - 月份
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *     "id": 14,
   *     "year": 2023,
   *     "month": 9,
   *     "content": {
   *         "FOOD-食物": 650,
   *         "OTHER-其他": 300
   *     },
   *     "totalAmount": 950
   * }
   */
  async handleCreateReport(request: Request, response: Response, next: NextFunction) {
    try {
      const { year, month } = request.params;

      if (!year) {
        throw new Error('Should provide year in path');
      }

      if (!month) {
        throw new Error('Should provide month in path');
      }

      response.send(await ReportController.createReport(Number(year), Number(month)));
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET /report/{year}/{month}
   * @summary 取得指定年月報表
   * @tags report 報表
   * @param { number } year.param.required - 年
   * @param { number } month.param.required - 月份
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *     "id": 14,
   *     "year": 2023,
   *     "month": 9,
   *     "content": {
   *         "FOOD-食物": 650,
   *         "OTHER-其他": 300
   *     },
   *     "totalAmount": 950
   * }
   */
  async handleGetReport(request: Request, response: Response, next: NextFunction) {
    try {
      const { year, month } = request.params;

      if (!year) {
        throw new Error('Should provide year in path');
      }

      if (!month) {
        throw new Error('Should provide month in path');
      }

      response.send(await ReportController.getReport(Number(year), Number(month)));
    } catch (error) {
      next(error)
    }
  }
}