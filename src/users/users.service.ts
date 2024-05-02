import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDTO } from "./dtos/create-users.dto";
import * as bcrypt from 'bcrypt'
import { UpdateUserDTO } from "./dtos/update-users.dto";




@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }


    async getAllUsers() {
        try {
            const users = await this.prisma.users.findMany();

            return users;
        } catch (error) {
            throw new BadRequestException("Não foi possivel visualizar usuarios, tente novamente mais tarde...")
        }
    }

    async getUsersById(id: number) {

        const user = await this.prisma.users.findFirst({
            where: {
                id
            }
        });

        if (!user) {
            throw new NotFoundException(`Usuario do ${id} não foi encontrado.`)
        }

        return user;

    }

    async create(data: CreateUserDTO) {
        try {
            const userExist = await this.prisma.users.findFirst({
                where: {
                    email: data.email,
                    CPF: data.CPF
                }
            });

            if (userExist) {
                throw new BadRequestException("Esse Usuario ja existe.");
            }

            const salt = await bcrypt.genSalt();
            data.senha = await bcrypt.hash(data.senha, salt);

            const user = await this.prisma.users.create({ data })

            return user;
        } catch (error) {
            throw new BadRequestException("não foi possivel Cadastrar Usuario, tente novamente mais tarde...")
        }
    }

    async UpdateUser({ nome, email, senha, CPF, cidade, role, Estado }: UpdateUserDTO, id: number) {

        try {
            const userExist = await this.prisma.users.findFirst({
                where: {
                    id
                }
            });

            if (!userExist) {
                throw new NotFoundException(`Usuario do ${id} não foi encontrado.`)
            };

            await this.prisma.users.update({
                where: {
                    id
                },
                data: {
                    nome, email, senha, CPF, cidade, role, Estado
                }
            });

            return { sucess: true }

        } catch (error) {
            throw new BadRequestException("Não foi possivel Atualizar o Usuario requerido.")
        }

    }


    async deleteUser(id: number) {
        try {
            const userExist = await this.prisma.users.findFirst({
                where: {
                    id
                }
            });

            if (!userExist) {
                throw new NotFoundException(`Usuario do ${id} não foi encontrado.`)
            };

            await this.prisma.users.delete({
                where: {
                    id
                }
            });

            return { sucess: true }
        } catch (e) {
            throw new BadRequestException("Não foi possivel deletar o Usuario, por favor tente mais tarde...")
        }
    }

}