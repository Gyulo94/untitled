import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';

@Global()
@Module({
  providers: [PrismaService, Logger],
  exports: [PrismaService, Logger],
})
export class GlobalModule {}
