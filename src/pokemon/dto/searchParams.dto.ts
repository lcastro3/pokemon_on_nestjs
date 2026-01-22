import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchParamsDto {
    
    @IsString()
    @Type(() => String)
    query: string;
    
    @IsString()
    @Type(() => String)
    @IsOptional()
    order?: 'ASC' | 'DESC';

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    size?: number;

}