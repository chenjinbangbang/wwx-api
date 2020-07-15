import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// const fs = require('fs');
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express'

// session
import * as session from 'express-session';

// cookie
import * as cookieParser from 'cookie-parser';

// 配置静态资源服务器
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';

// swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// https
const httpsOptions = {
  key: fs.readFileSync('src/secrets/server.key'),
  cert: fs.readFileSync('src/secrets/server.crt')
}
console.log(httpsOptions)

async function bootstrap() {
  const server = express();

  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));

  // session
  // app.use(session({
  //   // resave: true,
  //   // saveUninitialized: true,
  //   secret: 'wang',
  //   // cookie: { maxAge: 24 * 60 * 60 * 1000 }
  // }))

  app.use(cookieParser());

  // 配置静态资源服务器
  app.useStaticAssets(
    join(__dirname, '..', 'uploads'),
    { prefix: '/static/' } // 配置虚拟路径
  )

  // 配置swagger选项对象
  const options = new DocumentBuilder() // DocumentBuilder有助于构建符合OpenAPI规范的基础文档。
    .setTitle('万微想接口文档')
    .setDescription('万微想接口文档描述')
    .setVersion('1.0.0')
    .addTag('接口文档')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); // 1. Swagger UI的挂载路径。2. 应用程序实例。3. 上面已经实例化的文档对象document

  // await app.listen(81);
  await app.init();

  http.createServer(server).listen(80);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
