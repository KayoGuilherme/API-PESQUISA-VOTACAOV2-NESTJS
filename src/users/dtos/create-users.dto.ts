import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { Role } from "../../enums/role.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDTO {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nome: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @MaxLength(11)
    @MinLength(11)
    @IsNotEmpty()
    @IsString()
    CPF: string

    @ApiProperty()
    @IsNumber()
    @IsEnum(Role)
    role: Role.Pesquisador

    @ApiProperty()
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    senha: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cidade: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Estado: string
}