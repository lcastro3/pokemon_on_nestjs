import { IsNotEmpty, IsString } from "class-validator"

export class CreatePokemonDto {
    
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    type: string

}
