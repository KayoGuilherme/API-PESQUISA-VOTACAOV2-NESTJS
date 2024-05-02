import { Body, Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Paramid } from "../decorators/param-id.decorator";
import { CreateUserDTO } from "./dtos/create-users.dto";
import { UpdateUserDTO } from "./dtos/update-users.dto";
import { AuthGuard } from "../Guards/auth.guard";
import { RoleGuard } from "../Guards/role.guard";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../enums/role.enum";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(AuthGuard, RoleGuard)
@Controller('Users')
@ApiTags('Controle de Usuarios')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Roles(Role.Admin)
    @Get()
    async getUsers() {
        return this.usersService.getAllUsers();
    }

    @Roles(Role.Admin)
    @Get(':id')
    async getUsersById(@Paramid() id: number) {
        return this.usersService.getUsersById(id)
    }
    @Roles(Role.Admin)
    @Post('create')
    async createUsers(@Body() data: CreateUserDTO) {
        return this.usersService.create(data);
    }
    @Roles(Role.Admin)
    @Put(':id')
    async updateUser(@Paramid() id: number, @Body() data: UpdateUserDTO) {
        return this.usersService.UpdateUser(data, id);
    }
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteUser(@Paramid() id: number) {
        return this.usersService.deleteUser(id)
    }


}