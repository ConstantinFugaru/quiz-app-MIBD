import { Body, Controller, Post } from '@nestjs/common';
import { QuizService } from '@src/quiz/quiz.service';
import { QuestionCreateDto } from './dto/question-create-dto.interface';
import QuestionEntity from './question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(
        private readonly quizService: QuizService,
        private readonly questionsService: QuestionService,
    ){}

    @Post('/createQuestion')
    async createOneQuestion(@Body() body: QuestionCreateDto): Promise<QuestionEntity>{
        return await this.questionsService.createOne(body, body.quizId);
    }
}
