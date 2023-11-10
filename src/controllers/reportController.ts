import { AppDataSource } from "../../dataSource";
import Report from '../entity/report';
import ConsumptionController from "./consumptionController";

export default class ReportController {
  /**
   * 產生指定年月報表
   * @param year 
   * @param month 
   * @returns 
   */
  public static async createReport(year: number, month: number) {
    // 將過去產生的同年月的報表刪除
    await AppDataSource.getRepository(Report)
      .createQueryBuilder('report')
      .delete()
      .where('report.year=:year', { year })
      .andWhere('report.month=:month', { month })
      .execute();

    const consumptions = await ConsumptionController.getAllConsumptions(year, month);

    const report = new Report();
    report.year = year;
    report.month = month;

    const content: { [x: string]: number } = {};
    let totalAmount = 0;
    for (const consumption of consumptions) {
      content[`${consumption.typeId}-${consumption.type.name}`] = 
        (!content[`${consumption.typeId}-${consumption.type.name}`] ? 0 : content[`${consumption.typeId}-${consumption.type.name}`])
        + consumption.amount;
      totalAmount += consumption.amount;
    }

    report.content = content;
    report.totalAmount = totalAmount;

    await AppDataSource.manager.save(report);

    return report;
  }

  /**
   * 取得指定年月報表
   * @param year 
   * @param month 
   * @returns 
   */
  public static async getReport(year: number, month: number) {
    return await AppDataSource.getRepository(Report)
      .createQueryBuilder('report')
      .where('report.year=:year', { year })
      .where('report.month=:month', { month })
      .getOne();
  }
}