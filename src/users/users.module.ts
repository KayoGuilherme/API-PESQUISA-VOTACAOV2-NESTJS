import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";




@Module({
    imports: [forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UsersService, PrismaService, AuthService, JwtService],
    exports: [UsersService]
})


export class UsersModule {}