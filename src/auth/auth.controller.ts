import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dtos/login.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";


@Controller('Auth')
@ApiTags('Autenticação')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login (@Body() data: AuthLoginDTO) {
        return this.authService.login(data);
    }

}