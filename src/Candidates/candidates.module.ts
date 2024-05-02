import { Module } from "@nestjs/common";
import { CandidatesController } from "./candidates.controller";
import { CandidatesService } from "./candidates.service";
import { PrismaService } from "../prisma/prisma.service";
import { UsersModule } from "../users/users.module";
import { AuthModule } from "../auth/auth.module";




@Module({
    imports: [UsersModule, AuthModule],
    controllers: [CandidatesController],
    providers: [CandidatesService, PrismaService]
})
export class CandidatesModule{}