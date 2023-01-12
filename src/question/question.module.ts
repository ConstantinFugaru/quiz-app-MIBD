import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import QuestionEntity from './question.entity';
import { QuestionService } from './question.service';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionEntity])],
    providers: [QuestionService],
    controllers: [],
    exports: [QuestionService]
})
export class QuestionModule {}
