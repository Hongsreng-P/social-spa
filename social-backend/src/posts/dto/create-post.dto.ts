import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    title: string;

    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    description: string;
}
