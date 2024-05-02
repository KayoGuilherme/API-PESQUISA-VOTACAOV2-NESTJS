import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Users } from "@prisma/client";
import { AuthLoginDTO } from "./dtos/login.dto";
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly Jwt: JwtService,
    ) { }

    createToken(users: Users) {
        return {
            acessToken: this.Jwt.sign({
                id: users.id,
                name: users.nome,
                email: users.email,
                role: users.role
            },
                {
                    secret: String(process.env.JWT_SECRET),
                    expiresIn: '1 day',
                    subject: String(users.id)
                },
            ),
        }
    }

    checkToken(token: string) {
        try {
            const data = this.Jwt.verify(token, {
                secret: String(process.env.JWT_SECRET)
            });

            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async login(data: AuthLoginDTO) {
        try {
            const user = await this.prisma.users.findFirst({
                where: {
                    email: data.email
                }
            });

            if (!user) {
                throw new UnauthorizedException("Email ou senha incorretos")
            }

            if (! await bcrypt.compare(data.senha, user.senha)) {
                throw new UnauthorizedException('Email ou senha incorretos')
            }
            return this.createToken(user)
        } catch (error) {
            throw new BadRequestException("Não foi possivel realizar o Login, por favor tente mais tarde...")
        }
    }




}