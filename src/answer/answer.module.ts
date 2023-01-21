import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from '@src/question/question.service';
import QuizEntity from '@src/quiz/quiz.entity';
import { QuizService } from '@src/quiz/quiz.service';
import { AnswerController } from './answer.controller';
import QuestionEntity, { AnswerEntity } from './answer.entity';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity, QuizEntity, QuestionEntity])],
  providers: [AnswerService, QuestionService, QuizService],
  controllers: [AnswerController],
  exports: [AnswerService]
})
export class AnswerModule {}
