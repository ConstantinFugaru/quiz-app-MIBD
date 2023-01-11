import TaskEntity from "@src/task/task.entity";
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName :string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @OneToMany(()=> TaskEntity, (task) => task.user)
    taskList: TaskEntity[];

}

export default UserEntity;
