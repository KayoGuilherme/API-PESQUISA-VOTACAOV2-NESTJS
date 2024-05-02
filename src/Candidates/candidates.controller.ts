import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { CandidatesService } from "./candidates.service";
import { ParamCandidatoId } from "../decorators/param-id_candidato.decorator";
import { CreateCandidateDTO } from "./dtos/create-candidates.dto";
import { UpdateCandidatesDTO } from "./dtos/update-candidates.dto";
import { AuthGuard } from "../Guards/auth.guard";
import { RoleGuard } from "../Guards/role.guard";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { ApiTags } from "@nestjs/swagger";


@UseGuards(AuthGuard)
@Controller('Candidates')
@ApiTags('Controle de Candidatos')
export class CandidatesController {

    constructor(private readonly candidateService: CandidatesService) {}

    @Get()
    async getCandidates() {
        return this.candidateService.getAllCandidates();
    }

    @Get(':id_candidato')
    async getCandidatesById(@ParamCandidatoId() id_candidato: number) {
        return this.candidateService.getCandidatesById(id_candidato);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Post()
    async registerCandidate (@Body() data: CreateCandidateDTO) {
        return this.candidateService.registerCandidate(data);
    }

    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Put(':id_candidato')
    async updateCandidate(@ParamCandidatoId() id_candidato: number, @Body() data: UpdateCandidatesDTO){
        return this.candidateService.updateCandidate(data, id_candidato)
    }

    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    @Delete(':id_candidato')
    async deleteCandidate (@ParamCandidatoId() id_candidato: number) {
        return this.candidateService.deleteCandidate(id_candidato);
    }



}