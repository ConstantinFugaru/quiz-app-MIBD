import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from '@src/answer/answer.entity';
import { AnswerService } from '@src/answer/answer.service';
import QuizEntity from '@src/quiz/quiz.entity';
import { QuizService } from '@src/quiz/quiz.service';
import { QuestionController } from './question.controller';
import QuestionEntity from './question.entity';
import { QuestionService } from './question.service';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionEntity, QuizEntity, AnswerEntity])],
    providers: [QuestionService, QuizService, AnswerService],
    controllers: [QuestionController],
    exports: [QuestionService]
})
export class QuestionModule {}
