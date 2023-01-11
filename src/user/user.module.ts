import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TaskEntity from '@src/task/task.entity';
import { TaskService } from '@src/task/task.service';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import UserEntity from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, TaskEntity]),
    ],
    controllers: [UserController],
    providers: [UserService, TaskService],
})
export class UserModule {}