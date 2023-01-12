import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import QuestionEntity, { AnswerEntity } from '@src/answer/answer.entity';
import { AnswerService } from '@src/answer/answer.service';
import { QuestionService } from '@src/question/question.service';
import { QuizController } from './quiz.controller';
import QuizEntity from './quiz.entity';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizEntity, QuestionEntity, AnswerEntity]),
  ],
  controllers: [QuizController],
  providers: [QuizService, QuestionService, AnswerService]
})
export class QuizModule {}
