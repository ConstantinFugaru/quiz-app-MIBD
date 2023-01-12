import { QuestionEntity } from "@src/question/question.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AnswerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    textAnswer: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(()=> QuestionEntity, (question)=> question.answerList)
    question: QuestionEntity;
}

export default QuestionEntity;
