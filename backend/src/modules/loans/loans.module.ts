import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { GlobalAuthMiddleware } from '../../common/middleware/global-auth.middleware';

@Module({
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GlobalAuthMiddleware).forRoutes(LoansController);
  }
}
