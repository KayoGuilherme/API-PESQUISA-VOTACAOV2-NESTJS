import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VotesDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nome_eleitor: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    Idade_eleitor: number
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Localidade_eleitor: string;

    @ApiProperty()
    @IsBoolean()
    Votar: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    candidatoId: number;

}