import { AppDataSource } from "../../dataSource";
import Consumption from "../entity/consumption";
import Type from '../entity/type';

export default class TypeController {
  /**
   * 新增一項類別
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
   * 取得一項類別
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

    return type;
  }

  /**
   * 取得所有類別
   * @returns 
   */
  public static async getAllTypes() {
    return await AppDataSource.getRepository(Type)
      .createQueryBuilder('type')
      .orderBy({ 'updatedAt': 'ASC' })
      .getMany();
  }

  /**
   * 修改一項類別名稱
   * @param typeId 
   * @param name 
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
   * 刪除一項類別
   * @param typeId 
   * @returns 
   */
  public static async deleteType(typeId: string) {
    // 預設無法刪除 OTHER
    if (typeId === 'OTHER') {
      throw new Error('Can not delete OTHER');
    }

    // valid typeId
    await TypeController.getType(typeId);

    // 如果有consumption使用這個type, 就更新為 OTHER
    await AppDataSource.getRepository(Consumption)
      .createQueryBuilder('consumption')
      .update()
      .set({ typeId: 'OTHER' })
      .where('typeId=:typeId', { typeId })
      .execute();

    return await AppDataSource.getRepository(Type)
      .createQueryBuilder('type')
      .delete()
      .where('type.id=:id', { id: typeId })
      .execute();
  }
}