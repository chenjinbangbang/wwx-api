import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm";

// 官网用户PV表
@Entity()
export class UserPv extends BaseEntity { 
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '用户PV编号' })
  id: number;

  @Column({ type: 'varchar', comment: '访问设备', nullable: true })
  platform: string;

  @Column({ type: 'varchar', comment: '访问设备mac地址' })
  mac: string;

  @Column({ type: 'int', comment: '访问次数', default: 1 })
  visit_num: number;

  @Column({ type: 'timestamp', comment: '最新访问时间', default: () => 'CURRENT_TIMESTAMP' })
  // @UpdateDateColumn({ type: 'timestamp', comment: '最新访问时间', default: () => 'CURRENT_TIMESTAMP' })
  last_visit_time: Date;
}