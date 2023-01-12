import { Module } from '@nestjs/common';
import { UserModule } from '@src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { QuizModule } from './quiz/quiz.module';
import { AnswearModule } from './answear/answear.module';
import { QuestionService } from './question/question.service';
import { QuestionModule } from './question/question.module';

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
    QuizModule,
    AnswearModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService, QuestionService],
})
export class AppModule {}
