import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrimsaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrimsaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
