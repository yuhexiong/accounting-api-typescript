import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cronJob')
export class CronJob {
  @PrimaryGeneratedColumn({ name: "id", comment: "流水號", })
  id: number;

  @Column({ type: "varchar", unique: true, comment: "名稱", length: 100 })
  name: string

  @Column({ type: "varchar", comment: "秒", length: 20, default: '*' })
  seconds: string

  @Column({ type: "varchar", comment: "分", length: 20, default: '*' })
  minutes: string

  @Column({ type: "varchar", comment: "小時", length: 20, default: '*' })
  hours: string

  @Column({ type: "varchar", comment: "日", length: 20, default: '*' })
  day!: string;

}
