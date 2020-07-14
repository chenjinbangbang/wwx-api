import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 连接mysql数据库
import { TypeOrmModule } from '@nestjs/typeorm'; // 使用TypeORM是因为它是TypeScript中最成熟的对象关系映射器（ORM）
import { Connection } from 'typeorm';

// 模块
import { AuthModule } from './auth/auth.module';
import { WangModule } from './wang/wang.module';

@Module({
  imports: [
    // forRoot()方法接受与来自TypeORM包的createConnection()相同的配置对象
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: '8.129.186.66',
        port: 3306,
        username: 'root',
        password: 'panshuling666',
        database: 'wang_new',
        entities: [__dirname + '/**/**/*.entity.ts,.js'],
        synchronize: true
      }
    ),
    AuthModule,
    WangModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 建立连接。一旦完成，TypeORM连接和EntityManager对象就可以在整个项目中注入（不需要导入任何模块）
  constructor(private readonly connectioni: Connection) { }
}
