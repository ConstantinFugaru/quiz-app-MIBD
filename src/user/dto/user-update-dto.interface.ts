import { UserCreateDto } from "./user-create-dto.interface";

export interface UserUpdateDto extends Partial<UserCreateDto> {
    id : number;
}
