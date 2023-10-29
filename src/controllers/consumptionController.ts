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

    if (consumption.status !== 0) {
      throw new Error(`consumption ${consumptionId} not active`);
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
      .update()
      .set({ status: 9 })
      .where('consumption.id=:id', { id: consumptionId })
      .execute();
  }
}