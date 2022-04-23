import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { softDeleteMiddleware } from './middlewares/softDeleteMiddleware';

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$use(softDeleteMiddleware);
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
