import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import QuestionEntity from '@src/question/question.entity';
import { Repository } from 'typeorm';
import { QuizCreateDto } from './dto/quiz-create-dto.interface';
import { QuizDeleteDto } from './dto/quiz-delete-dto.interface';
import QuizEntity from './quiz.entity';
@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(QuizEntity) public quizRepository: Repository<QuizEntity>
    ){}

    async getAllQuiz() : Promise<QuizEntity[]>{
        return await this.quizRepository.find();
    }

    async getAllQuizWithQuestions() : Promise<QuizEntity[]>{
        return await this.quizRepository.find({
            relations : {
                questionList: true
            }
        });
    }


    async getOneById(id: number): Promise<QuizEntity | null> {
        return await this.quizRepository.findOneBy({id});
    }

    async getOneById2(id: number): Promise<QuizEntity | null> {
        return await this.quizRepository.findOne({
            where : {
                id
            },
            relations: {
                questionList: {
                    answerList : true,
                }
            }
        });
    }

    async getAllQuizzesWithQuestions2(): Promise<QuizEntity[]>{
        return await this.quizRepository
        .createQueryBuilder('quiz')
        .leftJoinAndSelect(QuestionEntity, 'question', 'quiz.id = question.quiz.id')
        .getMany();
    }

    /* De intrebat cum sa pot creea un question cu tot cu questions si answers */
    async createOne(dto: QuizCreateDto) : Promise<QuizEntity>{
        const quiz = this.quizRepository.create(dto);

        await this.quizRepository.save(quiz);
        return quiz;
    }


    async deleteOne(dto: QuizDeleteDto) : Promise<QuizEntity>{ 
        const quiz = await this.getOneById(dto.id);       
        if(!quiz){
            return null;
        }

        const result = await this.quizRepository.delete({id: dto.id});

        if(!result){
            return null;
        }

        return quiz; 
    }


}
