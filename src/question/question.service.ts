import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionCreateDto } from './dto/question-create-dto.interface';
import QuestionEntity from './question.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionEntity) private questionRepository: Repository<QuestionEntity>
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

    /* De intrebat cum sa pot creea un question cu tot cu answers */
    
    async createOne(dto: QuestionCreateDto) : Promise<QuestionEntity>{
        const question = this.questionRepository.create(dto);

        await this.questionRepository.save(question);
        return question;
    }
}
