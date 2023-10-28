import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import Type from "./type";

@Entity('consumption')
export default class Consumption {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: '日期', length: 20 })
  date!: string;

  @Column({ type: "smallint", comment: "狀態", default: 0 })
  status?: number;

  @Column({ type: "varchar", comment: '類別', length: 100 })
  typeId!: string;

  @Column({ type: "varchar", comment: "名稱", length: 100 })
  name!: string;

  @Column('bigint', { comment: '金額', default: 0 })
  amount!: number;

  @Column({ type: "varchar", nullable: true, comment: "名稱", length: 200 })
  note?: string;

  @ManyToOne(() => Type, (type) => type.consumptions, { onDelete: "RESTRICT", onUpdate: "RESTRICT", })
  @JoinColumn([{ name: "typeId", referencedColumnName: "id" }])
  type!: Type;

}
