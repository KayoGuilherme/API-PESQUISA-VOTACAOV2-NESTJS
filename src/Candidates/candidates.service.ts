import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCandidateDTO } from "./dtos/create-candidates.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateCandidatesDTO } from "./dtos/update-candidates.dto";




@Injectable()
export class CandidatesService {

    constructor(private readonly prisma: PrismaService) { }


    async getAllCandidates() {
        try {
            const candidate = await this.prisma.candidato.findMany();

            if (!candidate) {
                throw new NotFoundException("Nao existe Candidatos Cadastrados")
            }
            return candidate;
        } catch (error) {
            throw new BadRequestException("Não foi possivel Visualizar Candidatos.")
        }

    }

    async getCandidatesById(id_candidato: number) {
        try {
            const candidate = await this.prisma.candidato.findFirst({
                where: {
                    id_candidato
                }
            });

            if (!candidate) {
                throw new NotFoundException(`O candidato do id: ${id_candidato} não existe.`)
            }

            return candidate;
        } catch (e) {
            console.log(e)
            throw new BadRequestException("Nâo foi possivel visualuizar informacoes do Candidato.")
        }
    }


    async registerCandidate(data: CreateCandidateDTO) {
        try {
            const candidate = await this.prisma.candidato.create({
                data
            });

            return candidate;
        } catch (error) {
            throw new BadRequestException("Não foi possivel Cadastrar o Cadidato.")
        }
    }

    async updateCandidate({ name, estado, cidade, cargo, Partido, apelido }: UpdateCandidatesDTO, id_candidato: number) {
        try {
            const candidateExist = await this.prisma.candidato.findFirst({
                where: {
                    id_candidato
                }
            });

            if (!candidateExist) {
                throw new NotFoundException(`O candidato do ${id_candidato} não existe.`)
            }

            const candidate = await this.prisma.candidato.update({
                where: {
                    id_candidato
                },
                data: {
                    name, estado, cidade, cargo, Partido, apelido
                }
            });

            return { sucess: true }
        } catch (error) {
            throw new BadRequestException("Não foi possivel atualizar informacoes sobre o Candidato...")
        }
    }


    async deleteCandidate(id_candidato: number) {
        try {
            const candidateExist = await this.prisma.candidato.findFirst({
                where: {
                    id_candidato
                }
            });

            if (!candidateExist) {
                throw new NotFoundException(`O candidato do ${id_candidato} não existe.`)
            }

            await this.prisma.candidato.delete({
                where: {
                    id_candidato
                },
                include: {
                    Votos: true
                }
            });

            return { sucess: true }
        } catch (error) {

        }
    }

}