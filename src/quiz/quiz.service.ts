import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizCreateDto } from './dto/quiz-create-dto.interface';
import { QuizDeleteDto } from './dto/quiz-delete-dto.interface';
import { QuizUpdateDto } from './dto/quiz-update-dto.interface';
import QuizEntity from './quiz.entity';
@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(QuizEntity) private quizRepository: Repository<QuizEntity>
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

    async getAllQuizByCategory(category: string) : Promise<QuizEntity[]>{
        return await this.quizRepository.find({
            where : {
                category
            },
            relations: {
                questionList : true
            }
        });
    }

    async getOneById(id: number): Promise<QuizEntity | null> {
        return await this.quizRepository.findOne({
            where : {
                id
            },
            relations: {
                questionList : true
            }
        });
    }

    /* De intrebat cum sa pot creea un question cu tot cu questions si answers */
    
    async createOne(dto: QuizCreateDto) : Promise<QuizEntity>{
        const quiz = this.quizRepository.create(dto);

        await this.quizRepository.save(quiz);
        return quiz;
    }

    async updateOne(dto: QuizUpdateDto) : Promise<QuizEntity>{        
        if(!await this.getOneById(dto.id)){
            return null;
        }

        const result = await this.quizRepository.update({id: dto.id}, dto);
        if(!result){
            return null;
        }

        return await this.getOneById(dto.id); 
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
