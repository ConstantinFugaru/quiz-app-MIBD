import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '@src/user/user.entity';
import { Repository } from 'typeorm';
import { TaskCreateDto } from './dto/task-create-dto.interface';
import TaskEntity from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity) private taskRepository: Repository<TaskEntity>
    ){}

    async createOne(dto:TaskCreateDto, user:UserEntity): Promise<TaskEntity>{
        const task = this.taskRepository.create({...dto, user});
        await this.taskRepository.save(task);
        return task; 
    }
}
