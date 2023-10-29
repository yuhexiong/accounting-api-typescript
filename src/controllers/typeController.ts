import { AppDataSource } from "../../dataSource";
import Type from '../entity/type';

export default class TypeController {
  /**
   * 新增一筆類別
   * @param id 
   * @param name 
   * @returns 
   */
  public static async createType(id: string, name: string) {
    return await AppDataSource.createQueryBuilder()
      .insert()
      .into(Type)
      .values({ id, name })
      .execute();
  }

  /**
   * 取得類別
   * @param typeId 
   * @returns 
   */
  public static async getType(typeId: string) {
    const type = await AppDataSource.getRepository(Type)
      .createQueryBuilder('type')
      .where('type.id=:id', { id: typeId })
      .getOne();

    if (!type) {
      throw new Error(`type ${typeId} not found`);
    }

    if (type.status !== 0) {
      throw new Error(`type ${typeId} not active`);
    }

    return type;
  }

  /**
   * 修改類別名稱
   * @param typeId 
   * @returns 
   */
  public static async updateType(typeId: string, name: string) {
    // valid typeId
    await TypeController.getType(typeId);

    return await AppDataSource.getRepository(Type)
      .createQueryBuilder('type')
      .update()
      .set({ name })
      .where('type.id=:id', { id: typeId })
      .execute();
  }

  /**
   * 刪除類別
   * @param consumptionId 
   * @returns 
   */
  public static async deleteType(typeId: string) {
    // valid typeId
    await TypeController.getType(typeId);

    return await AppDataSource.getRepository(Type)
      .createQueryBuilder('type')
      .update()
      .set({ status: 9 })
      .where('type.id=:id', { id: typeId })
      .execute();
  }
}