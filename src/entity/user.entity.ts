import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// 用户表
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '用户编号' })
  id: number;

  @Column({ type: 'varchar', comment: 'openid' })
  openid: string;

  @Column({ type: 'varchar', comment: '昵称', nullable: true })
  nickName: string;

  @Column({ type: 'varchar', comment: '头像', nullable: true })
  avatarUrl: string;

  @Column({ type: 'varchar', comment: '省份', nullable: true })
  province: string;

  @Column({ type: 'varchar', comment: '城市', nullable: true })
  city: string;

  @Column({ type: 'varchar', comment: '国家', nullable: true })
  country: string;

  @Column({ type: 'tinyint', comment: '性别', nullable: true })
  gender: number;

  @Column({ type: 'tinyint', comment: '今天投票次数（每天0点清0）', default: 0 })
  vote: number;

  // @CreateDateColumn({ comment: '注册时间' })
  // create_time: Date;
}
