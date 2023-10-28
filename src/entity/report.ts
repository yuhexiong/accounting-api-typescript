import { Column, Entity, Generated } from "typeorm";

@Entity('report')
export default class Report {
  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "varchar", comment: '日期', length: 20 })
  data!: Date;

  @Column({ type: "smallint", comment: "狀態", default: 0 })
  status?: number;

  @Column({ type: "json", comment: '依分類金額', default: '{}' })
  content!: object;

  @Column({ type: "bigint", comment: "總金額", default: 0 })
  totalAmount!: number;

}
