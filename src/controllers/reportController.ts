import { AppDataSource } from "../../dataSource";
import Report from '../entity/report';

export default class ReportController {
  /**
   * 取得指定年月報表
   * @param year 
   * @param month 
   * @returns 
   */
  public static async getReport(year: number, month: number) {
    const report = await AppDataSource.getRepository(Report)
      .createQueryBuilder('report')
      .where('report.year=:year', { year })
      .where('report.month=:month', { month })
      .where('report.status=:status', { status: 0 })
      .getOne();

    if (!report) {
      throw new Error(`report ${year}-${month} not found`);
    }

    return report;
  }
}