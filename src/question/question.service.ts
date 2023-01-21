import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import QuizEntity from '@src/quiz/quiz.entity';
import { QuizService } from '@src/quiz/quiz.service';
import { Repository } from 'typeorm';
import { QuestionCreateDto } from './dto/question-create-dto.interface';
import QuestionEntity from './question.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionEntity) private questionRepository: Repository<QuestionEntity>,
        @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>,
        private readonly quizService: QuizService,
        
        ){}

    async getAllQuestionsWithAnswers() : Promise<QuestionEntity[]>{
        return await this.questionRepository.find({
            relations : {
                answerList: true
            }
        });
    }

    async getAllQuestions() : Promise<QuestionEntity[]>{
        return await this.questionRepository.find();
    }

    async getOneById(id:number) : Promise<QuestionEntity>{
        return await this.questionRepository.findOneBy({id});
    }

    /* De intrebat cum sa pot creea un question cu tot cu answers */
    
    async createOne(

        question: QuestionCreateDto, 

        quizId: number
        
        ) : Promise<QuestionEntity>{

        const quiz = await this.quizService.getOneById2(quizId);

        const newQuestion = await this.questionRepository.save({ 
            textQuestion : question.textQuestion
        });

        quiz.questionList = [...quiz.questionList, newQuestion];

        await this.quizRepository.save(quiz);

        console.log(quiz);
        console.log(quiz.questionList);


        return newQuestion;
    }
}
