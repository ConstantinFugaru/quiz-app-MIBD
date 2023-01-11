import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create-dto.interface';
import { UserDeleteDto } from './dto/user-delete-dto.interface';
import { UserUpdateDto } from './dto/user-update-dto.interface';
import UserEntity from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
    ){}

    async getAllUsers() : Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations : {
                taskList: true
            }
        });
    }

    // async getOneById(id: number): Promise<UserEntity | null> {
    //     return await this.userRepository.findOneBy({id});
    // } 

    async getOneById(id: number): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where : {
                id
            },
            relations: {
                taskList: true
            }
        });
    } 

    async createOne(dto: UserCreateDto) : Promise<UserEntity>{
        const user = this.userRepository.create(dto);

        await this.userRepository.save(user);
        return user; 
    }

    async updateOne(dto: UserUpdateDto) : Promise<UserEntity>{        
        if(!await this.getOneById(dto.id)){
            return null;
        }

        const result = await this.userRepository.update({id: dto.id}, dto);
        if(!result){
            return null;
        }

        return await this.getOneById(dto.id); 
    }

    async deleteOne(dto: UserDeleteDto) : Promise<UserEntity>{ 
        const user = await this.getOneById(dto.id);       
        if(!user){
            return null;
        }

        const result = await this.userRepository.delete({id: dto.id});

        if(!result){
            return null;
        }

        return user; 
    }
}
