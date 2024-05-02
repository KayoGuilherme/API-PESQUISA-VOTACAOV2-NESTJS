import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Cargos } from "../../enums/cargos.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCandidateDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    apelido: string

    @ApiProperty()
    @IsString()
    Partido: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cidade: string

    @ApiProperty()
    @IsString() 
    @IsNotEmpty()
    estado: string

    @ApiProperty()
    @IsEnum(Cargos)
    @IsString()
    @IsNotEmpty()
    cargo: string;

}