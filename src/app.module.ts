import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CandidatesModule } from './Candidates/candidates.module';
import { VotesModule } from './Votes/votes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileModule } from './files/file.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CandidatesModule,
    FileModule,
    VotesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
      serveRoot: 'swagger',
    })
  ]
})
export class AppModule { }
