import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1698491153566 implements MigrationInterface {
  name = 'createTable1698491153566'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`cronJob\` (\`id\` bigint NOT NULL AUTO_INCREMENT COMMENT '流水號', \`status\` smallint NOT NULL COMMENT '狀態' DEFAULT '0', \`name\` varchar(100) NOT NULL COMMENT '名稱', \`seconds\` varchar(20) NOT NULL COMMENT '秒' DEFAULT '*', \`minutes\` varchar(20) NOT NULL COMMENT '分' DEFAULT '*', \`hours\` varchar(20) NOT NULL COMMENT '小時' DEFAULT '*', \`day\` varchar(20) NOT NULL COMMENT '日' DEFAULT '*', UNIQUE INDEX \`IDX_5821a6ef6a384c13e33e820284\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`type\` (\`id\` varchar(20) NOT NULL COMMENT 'id', \`status\` smallint NOT NULL COMMENT '狀態' DEFAULT '0', \`type\` varchar(100) NOT NULL COMMENT '類別', \`name\` varchar(20) NOT NULL COMMENT '名稱', \`amount\` bigint NOT NULL COMMENT '金額' DEFAULT '0', \`note\` varchar(200) NULL COMMENT '名稱', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`consumption\` (\`id\` bigint NOT NULL AUTO_INCREMENT COMMENT '流水號', \`date\` varchar(20) NOT NULL COMMENT '日期', \`status\` smallint NOT NULL COMMENT '狀態' DEFAULT '0', \`typeId\` varchar(100) NOT NULL COMMENT '類別', \`name\` varchar(100) NOT NULL COMMENT '名稱', \`amount\` bigint NOT NULL COMMENT '金額' DEFAULT '0', \`note\` varchar(200) NULL COMMENT '名稱', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`report\` (\`id\` bigint NOT NULL AUTO_INCREMENT COMMENT '流水號', \`status\` smallint NOT NULL COMMENT '狀態' DEFAULT '0', \`year\` smallint NOT NULL COMMENT '年', \`month\` smallint NOT NULL COMMENT '月', \`content\` json NOT NULL COMMENT '依分類金額' DEFAULT '{}', \`totalAmount\` bigint NOT NULL COMMENT '總金額' DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`consumption\` ADD CONSTRAINT \`FK_de8666b1fee2c2ac5acf649b00e\` FOREIGN KEY (\`typeId\`) REFERENCES \`type\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`consumption\` DROP FOREIGN KEY \`FK_de8666b1fee2c2ac5acf649b00e\``);
    await queryRunner.query(`DROP TABLE \`report\``);
    await queryRunner.query(`DROP TABLE \`consumption\``);
    await queryRunner.query(`DROP TABLE \`type\``);
    await queryRunner.query(`DROP INDEX \`IDX_5821a6ef6a384c13e33e820284\` ON \`cronJob\``);
    await queryRunner.query(`DROP TABLE \`cronJob\``);
  }

}
