import moment from 'moment';
import { AppDataSource } from "../../data-source";
import Consumption from "../entity/consumption";
import Type from '../entity/type';

export default class ConsumptionController {
  /**
   * 新增一次消費
   * @param typeId 
   * @param name 
   * @param amount 
   * @param note 
   * @returns 
   */
  public static async createConsumption(typeId: string | undefined, name: string | undefined, amount: number | undefined, note: string | undefined) {
    // valid typeId
    if (typeId) {
      const type = await AppDataSource.getRepository(Type)
        .createQueryBuilder('type')
        .where('type.id=:id', { id: typeId })
        .andWhere('type.status=:status', { status: 0 })
        .getOne();

      if (!type) {
        throw new Error(`type ${type} not found`);
      }
    }

    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Consumption)
      .values({
        date: moment().format("YYYY-MM-DD"),
        typeId: typeId ?? "OTHER", // 預設OTHER
        name: name,
        amount: amount ?? 0,
        note: note ?? "",
      })
      .execute();
  }

  /**
   * 取得消費
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
   * 修改消費
   * @param consumptionId 
   * @returns 
   */
  public static async updateConsumption(consumptionId: number, typeId: string | undefined, name: string | undefined, amount: number | undefined, note: string | undefined) {
    // valid typeId
    if (typeId) {
      const type = await AppDataSource.getRepository(Type)
        .createQueryBuilder('type')
        .where('type.id=:id', { id: typeId })
        .andWhere('type.status=:status', { status: 0 })
        .getOne();

      if (!type) {
        throw new Error(`type ${type} not found`);
      }
    }

    // valid consumptionId
    await this.getConsumption(consumptionId);

    const updateData = {};
    if (typeId) updateData[typeId] = typeId;
    if (name) updateData[name] = name;
    if (amount) updateData[amount] = amount;
    if (note) updateData[note] = note;

    await AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')
      .update()
      .set(updateData)
      .where('consumption.id=:id', { id: consumptionId })
      .execute();

    return true;
  }

  /**
   * 刪除消費
   * @param consumptionId 
   * @returns 
   */
  public static async deleteConsumption(consumptionId: number) {
    const consumption = await AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')
      .where('consumption.id=:id', { id: consumptionId })
      .andWhere('consumption.status=:status', { status: 0 })
      .getOne();

    if (!consumption) {
      throw new Error(`consumption ${consumptionId} not found`);
    }

    await AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')
      .update()
      .set({ status: 9 })
      .where('consumption.id=:id', { id: consumptionId })
      .execute();

    return true;
  }
}