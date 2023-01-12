import { UserCreateDto } from "@src/user/dto/user-create-dto.interface";

export interface QuizUpdateDto extends Partial<UserCreateDto> {
    id : number;
}
