import UserEntity from "@src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({default:false})
    isCompleted: boolean;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(()=> UserEntity, (user) => user.taskList)
    user: UserEntity;
}

export default TaskEntity;
