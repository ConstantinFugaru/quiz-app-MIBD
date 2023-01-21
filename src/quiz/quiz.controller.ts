import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { AnswerEntity } from '@src/answer/answer.entity';
import { AnswerService } from '@src/answer/answer.service';
import { AnswerCreateDto } from '@src/answer/dto/answer-create-dto.interface';
import { QuestionCreateDto } from '@src/question/dto/question-create-dto.interface';
import QuestionEntity from '@src/question/question.entity';
import { QuestionService } from '@src/question/question.service';
import { QuizCreateDto } from './dto/quiz-create-dto.interface';
import { QuizDeleteDto } from './dto/quiz-delete-dto.interface';
import QuizEntity from './quiz.entity';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(
        private readonly quizService: QuizService,
        private readonly questionsService: QuestionService,
        private readonly answersService: AnswerService,
    ){}

    @Post('/')
    async createOneQuiz(@Body() body: QuizCreateDto): Promise<QuizEntity>{
        return await this.quizService.createOne(body);
    } 

    @Post('/createQuestion')
    async createOneQuestion(@Body() body: QuestionCreateDto): Promise<QuestionEntity>{
        return await this.questionsService.createOne(body, body.quizId);
    }
    
    @Post('/createAnswer')
    async createOneAnswer(@Body() body: AnswerCreateDto): Promise<AnswerEntity>{
        const question = await this.questionsService.getOneById(body.questionId);
        return await this.answersService.createOne(body, question);
    } 

    @Get('/allQ')
    async getAllQuiz(): Promise<QuizEntity[]>{
        return await this.quizService.getAllQuiz();
    }

    @Get('/allQWQ')
    async getAllQuizWithQuestions() : Promise<QuizEntity[]>{
        return await this.quizService.getAllQuizWithQuestions();
    }

    @Get('/allQWQ2')
    async getAllQuizWithQuestions2() : Promise<QuizEntity[]>{
        return await this.quizService.getAllQuizzesWithQuestions2();
    }


    @Get('/:id')
    async getOneById(@Param('id') id:number): Promise<QuizEntity>{
        const quiz = await this.quizService.getOneById(+id);
        if(!quiz){
            throw new NotFoundException();
        }

        return quiz;
    }


    @Delete('/deleteQ')
    async deleteOne(@Body() body: QuizDeleteDto): Promise<QuizEntity> {
        const updatedQuiz = await this.quizService.deleteOne(body);

        if(!updatedQuiz){
            throw new NotFoundException(`Nu exista quiz pentru id ${body.id}`);
        }

        return updatedQuiz;
    }
}
