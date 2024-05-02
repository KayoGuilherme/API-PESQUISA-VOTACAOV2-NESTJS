import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { VotesDTO } from "./dtos/votes.dto";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class VotesService {

    constructor(private readonly prisma: PrismaService) {}



    async getAllVotes () {
        try {
            const votes = await this.prisma.candidato.findMany({
                include: {
                    Votos: {
                        select: {
                            id_voto: true
                        }
                    }
                }
            });

            if(!votes) {
                throw new NotFoundException("Nao foi possivel visualizar os votos");
            }

            const resultado = votes.map((candidato) => ({
                id_candidato: candidato.id_candidato,
                nome: candidato.name,
                apelido: candidato.apelido,
                partido: candidato.Partido,
                cidade: candidato.cidade,
                estado: candidato.estado,
                cargo: candidato.cargo,
                votos: candidato.Votos.length

            }));

            return resultado;
        } catch (error) {
            throw new BadRequestException("Nao foi possivel visualizar informacoes de votos")
        }
    }


    async registerVoto(data: VotesDTO) {
        try {
            const vote = await this.prisma.votos.create({
                data
            });

            return vote;
        } catch (e) {
            console.log(e)
            throw new BadRequestException("Não foi possivel registrar o voto.")
        }
    }



}