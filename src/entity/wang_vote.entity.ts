import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 用户表
@Entity()
export class WangVote extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '英雄编号' })
  id: number;

  @Column({ type: 'varchar', comment: '英雄名字' })
  name: string;

  @Column({ type: 'varchar', comment: '英雄头像' })
  imgUrl: string;

  @Column({ type: 'bigint', comment: '英雄投票数' })
  votes: number;
}
