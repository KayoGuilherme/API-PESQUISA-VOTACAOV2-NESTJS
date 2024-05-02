import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { VotesDTO } from "./dtos/votes.dto";
import { AuthGuard } from "../Guards/auth.guard";
import { RoleGuard } from "../Guards/role.guard";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { ApiTags } from "@nestjs/swagger";




@UseGuards(AuthGuard)
@Controller('Votos')
@ApiTags('Controle de Votos')
export class VotesController {

    constructor(private readonly votesService: VotesService) {}

    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Get()
    async getVotes() {
        return this.votesService.getAllVotes();
    }

    @Post()
    async registerVote(@Body() data: VotesDTO) {
        return this.votesService.registerVoto(data);
    }
}