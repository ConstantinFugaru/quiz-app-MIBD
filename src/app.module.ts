import { Module } from '@nestjs/common';
import { UserModule } from '@src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    UserModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "quizDB",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
