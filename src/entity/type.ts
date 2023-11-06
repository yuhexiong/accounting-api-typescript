import { Column, CreateDateColumn, Entity, OneToMany } from "typeorm";
import Consumption from "./consumption";

@Entity('type')
export default class Type {
  @Column("varchar", { primary: true, comment: "id", length: 20, })
  id!: string;

  @CreateDateColumn({ type: 'datetime', name: 'createDate', comment: '修改時間', })
  createDate!: Date;

  @Column({ type: "varchar", comment: "名稱", length: 20 })
  name!: string;

  @OneToMany(() => Consumption, (consumption) => consumption.type)
  consumptions?: Consumption[];

}
