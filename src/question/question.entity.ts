import { AnswerEntity } from "@src/answer/answer.entity";
import QuizEntity from "@src/quiz/quiz.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    textQuestion: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(()=> AnswerEntity, (answer) => answer.question)
    answerList: AnswerEntity[];

    @ManyToOne(()=> QuizEntity, (quiz) => quiz.questionList)
    quiz:  QuizEntity;
}
export default QuestionEntity;
