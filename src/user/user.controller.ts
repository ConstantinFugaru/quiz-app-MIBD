import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TaskCreateDto } from '@src/task/dto/task-create-dto.interface';
import TaskEntity from '@src/task/task.entity';
import { TaskService } from '@src/task/task.service';
import { UserService } from '@src/user/user.service';
import { UserCreateDto } from './dto/user-create-dto.interface';
import { UserDeleteDto } from './dto/user-delete-dto.interface';
import { UserFullNameDto } from './dto/user-fullname-dto.interface';
import { UserUpdateDto } from './dto/user-update-dto.interface';
import UserEntity from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService
    ){}

    @Get()
    async getAll(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers();
    }

    @Get('/:id')
    async getOne(@Param('id') id: string): Promise<UserEntity> {
        const user = await this.userService.getOneById(+id);
        if(!user){
            throw new NotFoundException();
        }

        return user;
    }

    @Get('/:id/full-name')
    async getOneFullName(@Param('id') id: string): Promise<UserFullNameDto> {
        const user = await this.userService.getOneById(+id);
        if(!user){
            throw new NotFoundException(`Nu exista user pentru id ${id}`);
        }

        return {fullName: `${user.firstName} ${user.lastName}`};
    }

    @Post('/:id/task')
    async createTask(@Param('id') id: string, @Body() body: TaskCreateDto): Promise<TaskEntity> {
        const user = await this.userService.getOneById(+id);
        if(!user){
            throw new NotFoundException(`Nu exista user pentru id ${id}`);
        }
        
        return await this.taskService.createOne(body, user);
    }

     @Post('/')
    async createOne(@Body() body: UserCreateDto): Promise<UserEntity> {
        return await this.userService.createOne(body);
    }

    @Put('/')
    async updateOne(@Body() body: UserUpdateDto): Promise<UserEntity> {
        const updatedUser = await this.userService.updateOne(body);

        if(!updatedUser){
            throw new NotFoundException(`Nu exista user pentru id ${body.id}`);
        }

        return updatedUser;
    }

    @Delete('/')
    async deleteOne(@Body() body: UserDeleteDto): Promise<UserEntity> {
        const updatedUser = await this.userService.deleteOne(body);

        if(!updatedUser){
            throw new NotFoundException(`Nu exista user pentru id ${body.id}`);
        }

        return updatedUser;
    }

}
