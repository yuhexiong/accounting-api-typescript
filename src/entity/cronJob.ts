import { Column, Entity, Generated } from "typeorm";

@Entity('cronJob')
export class CronJob {

  @Column("bigint", { primary: true, comment: "流水號", })
  @Generated('increment')
  id!: number;

  @Column({ type: "smallint", comment: "狀態", default: 0 })
  status?: number;

  @Column({ type: "varchar", unique: true, comment: "名稱", length: 100 })
  name!: string;

  @Column({ type: "varchar", comment: "秒", length: 20, default: '*' })
  seconds!: string;

  @Column({ type: "varchar", comment: "分", length: 20, default: '*' })
  minutes!: string;

  @Column({ type: "varchar", comment: "小時", length: 20, default: '*' })
  hours!: string;

  @Column({ type: "varchar", comment: "日", length: 20, default: '*' })
  day!: string;

}
