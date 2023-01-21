import QuestionEntity from "@src/answer/answer.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuizEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: string;

    @OneToMany(()=> QuestionEntity, (question)=> question.quiz)
    questionList: QuestionEntity[];

}

export default QuizEntity;