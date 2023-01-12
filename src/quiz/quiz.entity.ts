import QuestionEntity from "@src/answer/answer.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class QuizEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    score: number;

    @Column()
    available: boolean;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(()=> QuestionEntity, (question)=> question.quiz)
    questionList: QuestionEntity[];

}

export default QuizEntity;
