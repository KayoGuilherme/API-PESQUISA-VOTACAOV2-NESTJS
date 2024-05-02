import { Module } from "@nestjs/common";
import { VotesController } from "./votes.controller";
import { VotesService } from "./votes.service";
import { PrismaService } from "../prisma/prisma.service";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";




@Module({
    imports: [UsersModule, AuthModule],
    controllers: [VotesController],
    providers: [VotesService, PrismaService]
})
export class VotesModule {}