import { IsNotEmpty, MinLength } from 'class-validator';

export class NewsDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

    @IsNotEmpty()
    @MinLength(10)
    readonly shortDescription: string;

    @IsNotEmpty()
    @MinLength(10)
    readonly longDescription: string;

    @IsNotEmpty()
    readonly location: string;

    readonly image: string;
    
    @IsNotEmpty()
    readonly date: string;

}
