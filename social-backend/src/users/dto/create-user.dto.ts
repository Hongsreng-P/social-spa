import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber } from "class-validator";

const allowedRoles = ['admin', 'user'];

export class CreateUserDto {
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    username: string;

    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    password: string;

    @IsNotEmpty()
    @IsIn(allowedRoles)
    @Transform(({value}) => value.trim())
    role: string;

    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    address: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;
}
