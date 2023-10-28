import { Column, Entity, OneToMany } from "typeorm";
import Consumption from "./consumption";

@Entity('type')
export default class Type {
  @Column("varchar", { primary: true, comment: "id", length: 20, })
  id!: string;

  @Column({ type: "smallint", comment: "狀態", default: 0 })
  status?: number;

  @Column({ type: "varchar", comment: "名稱", length: 20 })
  name!: string;

  @OneToMany(() => Consumption, (consumption) => consumption.type)
  consumptions?: Consumption[];

}
