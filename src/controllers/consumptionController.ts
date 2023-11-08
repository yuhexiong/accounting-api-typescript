import moment from 'moment';
import { AppDataSource } from "../../dataSource";
import Consumption from "../entity/consumption";
import TypeController from './typeController';

export default class ConsumptionController {
  /**
   * 新增一筆消費
   * @param typeId 
   * @param name 
   * @param amount 
   * @param note 
   * @returns 
   */
  public static async createConsumption(typeId: string | undefined, name: string | undefined, amount: number | undefined, note: string | undefined) {
    // valid typeId
    if (typeId) await TypeController.getType(typeId);

    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Consumption)
      .values({
        date: moment().format("YYYY-MM-DD"),
        typeId: typeId ?? "OTHER", // 預設OTHER
        name,
        amount: amount ?? 0,
        note: note ?? "",
      })
      .execute();
  }

  /**
   * 取得所有消費
   * @param year 
   * @param month 
   * @returns 
   */
  public static async getAllConsumptions(year?: number, month?: number) {
    const queryBuilder = AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')

    if (month) {
      // 只提供月份就預設今年
      const dateString = year ? `${year}-${month}-01` : `${moment().format('YYYY')}-${month}-01`;
      const startOfMonth = moment(dateString).startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(dateString).endOf('month').format('YYYY-MM-DD');

      queryBuilder.where('consumption.date BETWEEN :startOfMonth AND :endOfMonth', { startOfMonth, endOfMonth });
    }

    return await queryBuilder.getMany();
  }

  /**
   * 取得一筆消費
   * @param consumptionId 
   * @returns 
   */
  public static async getConsumption(consumptionId: number) {
    const consumption = await AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')
      .where('consumption.id=:id', { id: consumptionId })
      .getOne();

    if (!consumption) {
      throw new Error(`consumption ${consumptionId} not found`);
    }

    return consumption;
  }

  /**
   * 修改一筆消費
   * @param consumptionId 
   * @param typeId 
   * @param name 
   * @param amount 
   * @param note 
   * @returns 
   */
  public static async updateConsumption(consumptionId: number, typeId: string | undefined, name: string | undefined, amount: number | undefined, note: string | undefined) {
    // valid typeId
    if (typeId) await TypeController.getType(typeId);

    // valid consumptionId
    await this.getConsumption(consumptionId);

    const updateData = {};
    if (typeId) updateData['typeId'] = typeId;
    if (name) updateData['name'] = name;
    if (amount) updateData['amount'] = amount;
    if (note) updateData['note'] = note;

    return await AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')
      .update()
      .set(updateData)
      .where('consumption.id=:id', { id: consumptionId })
      .execute();
  }

  /**
   * 刪除一筆消費
   * @param consumptionId 
   * @returns 
   */
  public static async deleteConsumption(consumptionId: number) {
    // valid consumptionId
    await this.getConsumption(consumptionId);

    return await AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')
      .delete()
      .where('consumption.id=:id', { id: consumptionId })
      .execute();
  }
}