import { Column, Entity, OneToMany } from "typeorm";
import { Consumption } from "./consumption";

@Entity('type')
export class Type {
  @Column("varchar", { primary: true, comment: "id", length: 20, })
  id!: string;

  @Column({ type: "smallint", comment: "狀態", default: 0 })
  status?: number;

  @Column({ type: "varchar", comment: '類別', length: 100 })
  type!: string;

  @Column({ type: "varchar", comment: "名稱", length: 20 })
  name!: string;

  @Column('bigint', { comment: '金額', default: 0 })
  amount!: number;

  @Column({ type: "varchar", nullable: true, comment: "名稱", length: 200 })
  note?: string;

  @OneToMany(() => Consumption, (consumption) => consumption.type)
  consumptions?: Consumption[];

}
