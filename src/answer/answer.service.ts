import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import QuestionEntity, { AnswerEntity } from './answer.entity';
import { AnswerCreateDto } from './dto/answer-create-dto.interface';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswerEntity) private answerRepository: Repository<AnswerEntity>
    ){}

    async createOne(dto:AnswerCreateDto, question:QuestionEntity): Promise<AnswerEntity>{
        const answer = this.answerRepository.create({...dto, question});
        await this.answerRepository.save(answer);
        return answer;
    }
}
