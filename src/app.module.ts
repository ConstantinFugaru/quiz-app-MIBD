import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { AnswerModule } from './answer/answer.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    QuizModule,
    AnswerModule,
    QuestionModule,
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
