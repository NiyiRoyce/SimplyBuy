import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { LoansModule } from './modules/loans/loans.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, LoansModule, UsersModule],
})
export class AppModule {}
